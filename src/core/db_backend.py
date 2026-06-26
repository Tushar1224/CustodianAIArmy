"""
Database backend abstraction supporting SQLite (default) and PostgreSQL.
Auto-detects backend from DATABASE_URL environment variable.
"""
import os
import sqlite3
from typing import Any, Optional, List, Tuple


def _get_db_path():
    if os.getenv("VERCEL") or os.getenv("AWS_LAMBDA_FUNCTION_NAME"):
        return "/tmp/custodian.db"
    return os.path.abspath("custodian.db")


class Database:
    """Thread-safe database abstraction. Opens/closes a connection per call.

    SQLite: direct connect (fast for single-process use).
    PostgreSQL: connects from an internal pool (psycopg2).
    """

    def __init__(self):
        self.url = os.getenv("DATABASE_URL", "")
        # If still empty, try the pydantic Settings class
        if not self.url:
            try:
                from src.core.config import settings
                if settings.DATABASE_URL:
                    self.url = settings.DATABASE_URL
            except (ImportError, AttributeError):
                pass
        self._pg_pool = None
        self._db_path = None

        if self.url.startswith("postgresql://") or self.url.startswith("postgres://"):
            print(f"[db] DATABASE_URL set — connecting to PostgreSQL...")
            self._init_pg()
        else:
            self._db_path = self.url or os.getenv("DATABASE_PATH", _get_db_path())
            print(f"[db] Using SQLite at {self._db_path}")

    # ── initialisation ──────────────────────────────────────────────────

    def _init_pg(self):
        try:
            import psycopg2
            from psycopg2 import pool
            self._pg_pool = pool.ThreadedConnectionPool(2, 10, self.url)
            print(f"[db] PostgreSQL pool ready")
        except Exception as e:
            print(f"[db] FAILED to connect to PostgreSQL: {e}")
            print(f"[db] Falling back to SQLite")
            self._pg_pool = None
            self._db_path = _get_db_path()
            self.url = ""

    # ── connection lifecycle ────────────────────────────────────────────

    def _conn(self):
        if self._pg_pool:
            return self._pg_pool.getconn()
        conn = sqlite3.connect(self._db_path, timeout=20)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA busy_timeout=5000")
        return conn

    def _close(self, conn):
        if self._pg_pool:
            self._pg_pool.putconn(conn)
        else:
            conn.close()

    def _is_pg(self):
        return self._pg_pool is not None

    def _sql(self, query: str) -> str:
        """Translate SQLite-specific syntax to PostgreSQL when needed."""
        if not self._is_pg():
            return query
        # Parameter placeholders: SQLite uses ?, PostgreSQL uses %s
        # We use a simple replace that works because ? only appears as placeholders
        query = query.replace("?", "%s")
        # julianday -> epoch seconds
        query = query.replace(
            "(julianday('now') - julianday(fetched_at)) * 24",
            "(EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM fetched_at::timestamp)) / 3600.0"
        )
        query = query.replace(
            "julianday('now') - julianday(fetched_at)",
            "(EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM fetched_at::timestamp)) / 86400.0"
        )
        return query

    # ── public API ──────────────────────────────────────────────────────

    def _query(self, query: str, params: tuple = ()):
        """Low-level execute, returns (cursor, conn) — caller MUST close conn."""
        conn = self._conn()
        try:
            cur = conn.cursor()
            if params:
                cur.execute(self._sql(query), params)
            else:
                cur.execute(self._sql(query))
            conn.commit()
            return cur, conn
        except Exception as e:
            conn.rollback()
            self._close(conn)
            print(f"[db] SQL error: {e}")
            print(f"[db] Query: {query[:200]}")
            raise

    def execute(self, query: str, params: tuple = ()) -> Any:
        cur, conn = self._query(query, params)
        self._close(conn)
        return cur

    def fetchone(self, query: str, params: tuple = ()) -> Optional[tuple]:
        cur, conn = self._query(query, params)
        try:
            row = cur.fetchone()
            return tuple(row) if row else None
        finally:
            self._close(conn)

    def fetchall(self, query: str, params: tuple = ()) -> List[tuple]:
        cur, conn = self._query(query, params)
        try:
            return [tuple(r) for r in cur.fetchall()]
        finally:
            self._close(conn)

    def executemany(self, query: str, params_list: List[tuple]):
        conn = self._conn()
        try:
            cur = conn.cursor()
            sql = self._sql(query)
            for params in params_list:
                cur.execute(sql, params)
            conn.commit()
            return cur
        except Exception:
            if self._pg_pool:
                conn.rollback()
            raise
        finally:
            self._close(conn)

    @property
    def db_path(self) -> str:
        return self._db_path or self.url

    def init_tables(self):
        """Create all tables and run migrations. Idempotent."""
        if self._is_pg():
            self._init_tables_pg()
        else:
            self._init_tables_sqlite()

    # ── SQLite table creation ───────────────────────────────────────────

    def _init_tables_sqlite(self):
        db_dir = os.path.dirname(self._db_path)
        if db_dir and not os.path.exists(db_dir):
            os.makedirs(db_dir, exist_ok=True)
        conn = sqlite3.connect(self._db_path, timeout=20)
        try:
            conn.execute("PRAGMA journal_mode=WAL")
        except sqlite3.OperationalError:
            pass
        c = conn.cursor()
        self._create_all_tables_sqlite(c)
        conn.commit()
        conn.close()
        print(f"Database initialized at {self._db_path}")

    def _create_all_tables_sqlite(self, c):
        c.execute("""CREATE TABLE IF NOT EXISTS chat_sessions (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL, title TEXT NOT NULL,
            start_time TEXT NOT NULL, last_updated TEXT NOT NULL, messages TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT NOT NULL,
            course_id TEXT NOT NULL, lang TEXT NOT NULL DEFAULT 'en',
            section_index INTEGER NOT NULL DEFAULT 0,
            completed_sections TEXT NOT NULL DEFAULT '[]',
            last_updated TEXT NOT NULL,
            UNIQUE(user_email, course_id, lang))""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_profile (
            user_email TEXT PRIMARY KEY, current_course TEXT,
            current_lang TEXT DEFAULT 'en', preferences TEXT NOT NULL DEFAULT '{}',
            last_updated TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_api_keys (
            user_email TEXT PRIMARY KEY, gemini_api_key TEXT, anthropic_api_key TEXT,
            last_updated TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_plans (
            user_email TEXT PRIMARY KEY, plan TEXT NOT NULL DEFAULT 'guest',
            requests_today INTEGER NOT NULL DEFAULT 0,
            last_reset_date TEXT NOT NULL, plan_expiry TEXT)""")
        self._alter_sqlite(c, "user_plans", "plan_expiry TEXT")
        c.execute("""CREATE TABLE IF NOT EXISTS payments (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL, amount REAL NOT NULL,
            currency TEXT NOT NULL DEFAULT 'usd', plan TEXT NOT NULL,
            status TEXT NOT NULL, payment_method TEXT NOT NULL DEFAULT 'demo',
            created_at TEXT NOT NULL, valid_until TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS daily_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT NOT NULL,
            date TEXT NOT NULL, request_count INTEGER NOT NULL DEFAULT 0,
            last_updated TEXT NOT NULL,
            UNIQUE(user_email, date),
            FOREIGN KEY (user_email) REFERENCES user_plans(user_email))""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_github_connections (
            user_email TEXT PRIMARY KEY, github_token TEXT NOT NULL,
            github_username TEXT NOT NULL, connected_at TEXT NOT NULL,
            last_updated TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_github_repo_permissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT NOT NULL,
            repo_name TEXT NOT NULL, permission_granted INTEGER NOT NULL DEFAULT 1,
            last_updated TEXT NOT NULL, UNIQUE(user_email, repo_name))""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_resumes (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL,
            title TEXT NOT NULL DEFAULT 'Untitled Resume',
            data TEXT NOT NULL DEFAULT '{}', jd TEXT, ats_score INTEGER,
            created_at TEXT NOT NULL, updated_at TEXT NOT NULL)""")
        self._alter_sqlite(c, "user_resumes", "template_name TEXT")
        self._alter_sqlite(c, "user_resumes", "chat_history TEXT DEFAULT '[]'")
        c.execute("""CREATE TABLE IF NOT EXISTS user_templates (
            name TEXT PRIMARY KEY, category TEXT NOT NULL DEFAULT 'general',
            config TEXT NOT NULL, section_defs TEXT NOT NULL DEFAULT '[]',
            user_email TEXT, is_system INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL)""")
        self._alter_sqlite(c, "user_templates", "category TEXT NOT NULL DEFAULT 'general'")
        self._alter_sqlite(c, "user_templates", "section_defs TEXT NOT NULL DEFAULT '[]'")
        c.execute("""CREATE TABLE IF NOT EXISTS custom_agent_configs (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL, name TEXT NOT NULL,
            description TEXT, skills TEXT NOT NULL, last_updated TEXT NOT NULL)""")
        for col, dtype in [
            ("mcp_tools", "TEXT NOT NULL DEFAULT '[]'"),
            ("system_prompt", "TEXT DEFAULT ''"),
            ("specialization", "TEXT DEFAULT ''"),
        ]:
            self._alter_sqlite(c, "custom_agent_configs", f"{col} {dtype}")
        c.execute("""CREATE TABLE IF NOT EXISTS mvp_sessions (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL,
            product_idea TEXT NOT NULL, current_phase_index INTEGER NOT NULL DEFAULT 0,
            mode TEXT NOT NULL DEFAULT 'plan', phases TEXT NOT NULL DEFAULT '[]',
            chat_history TEXT NOT NULL DEFAULT '[]', files TEXT NOT NULL DEFAULT '{}',
            github_connected INTEGER NOT NULL DEFAULT 0, github_repo_name TEXT,
            github_username TEXT, logs TEXT NOT NULL DEFAULT '[]',
            created_at TEXT NOT NULL, updated_at TEXT NOT NULL)""")
        self._create_job_tables_sqlite(c)

    def _create_job_tables_sqlite(self, c):
        c.execute("""CREATE TABLE IF NOT EXISTS job_searches (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL, resume_id TEXT,
            resume_data TEXT NOT NULL, jobs TEXT NOT NULL,
            total_count INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS global_job_cache (
            id TEXT PRIMARY KEY, search_query TEXT NOT NULL,
            jobs TEXT NOT NULL, total_count INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS job_cache_accumulated (
            job_key TEXT PRIMARY KEY, title TEXT NOT NULL, company TEXT NOT NULL,
            location TEXT DEFAULT '', type TEXT DEFAULT '',
            description TEXT DEFAULT '', apply_url TEXT DEFAULT '',
            date_posted TEXT DEFAULT '', salary_range TEXT DEFAULT '',
            match_score INTEGER DEFAULT 0, source TEXT DEFAULT '',
            fetched_at TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS job_fetch_state (
            key TEXT PRIMARY KEY, value TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS applied_jobs (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL, title TEXT NOT NULL,
            company TEXT NOT NULL, location TEXT DEFAULT '', source TEXT DEFAULT '',
            apply_url TEXT DEFAULT '', salary_range TEXT DEFAULT '',
            match_score INTEGER DEFAULT 0, date_posted TEXT DEFAULT '',
            applied_at TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS mvp_sessions_archive (
            id TEXT PRIMARY KEY, user_email TEXT NOT NULL,
            product_idea TEXT NOT NULL, current_phase_index INTEGER NOT NULL DEFAULT 0,
            mode TEXT NOT NULL DEFAULT 'plan', phases TEXT NOT NULL DEFAULT '[]',
            chat_history TEXT NOT NULL DEFAULT '[]', files TEXT NOT NULL DEFAULT '{}',
            github_connected INTEGER NOT NULL DEFAULT 0, github_repo_name TEXT,
            github_username TEXT, logs TEXT NOT NULL DEFAULT '[]',
            created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
            archived_at TEXT NOT NULL)""")

    @staticmethod
    def _alter_sqlite(c, table, column_def):
        try:
            c.execute(f"ALTER TABLE {table} ADD COLUMN {column_def}")
        except sqlite3.OperationalError:
            pass

    # ── PostgreSQL table creation ────────────────────────────────────────

    def _init_tables_pg(self):
        conn = self._conn()
        try:
            cur = conn.cursor()
            self._create_all_tables_pg(cur)
            conn.commit()
            print(f"[db] PostgreSQL tables ready")
        except Exception as e:
            conn.rollback()
            print(f"[db] PostgreSQL init error: {e}")
            raise
        finally:
            self._close(conn)

    def _create_all_tables_pg(self, c):
        c.execute("""
            CREATE TABLE IF NOT EXISTS chat_sessions (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL, title TEXT NOT NULL,
                start_time TEXT NOT NULL, last_updated TEXT NOT NULL, messages TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                session_id TEXT PRIMARY KEY, user_id TEXT, user_email TEXT,
                user_name TEXT, user_picture TEXT, created_at TEXT, last_activity TEXT)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_progress (
                id SERIAL PRIMARY KEY, user_email TEXT NOT NULL,
                course_id TEXT NOT NULL, lang TEXT NOT NULL DEFAULT 'en',
                section_index INTEGER NOT NULL DEFAULT 0,
                completed_sections TEXT NOT NULL DEFAULT '[]',
                last_updated TEXT NOT NULL,
                UNIQUE(user_email, course_id, lang))""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_profile (
                user_email TEXT PRIMARY KEY, current_course TEXT,
                current_lang TEXT DEFAULT 'en', preferences TEXT NOT NULL DEFAULT '{}',
                last_updated TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_api_keys (
                user_email TEXT PRIMARY KEY, gemini_api_key TEXT, anthropic_api_key TEXT,
                last_updated TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_plans (
                user_email TEXT PRIMARY KEY, plan TEXT NOT NULL DEFAULT 'guest',
                requests_today INTEGER NOT NULL DEFAULT 0,
                last_reset_date TEXT NOT NULL, plan_expiry TEXT)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS payments (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL, amount REAL NOT NULL,
                currency TEXT NOT NULL DEFAULT 'usd', plan TEXT NOT NULL,
                status TEXT NOT NULL, payment_method TEXT NOT NULL DEFAULT 'demo',
                created_at TEXT NOT NULL, valid_until TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS daily_requests (
                id SERIAL PRIMARY KEY, user_email TEXT NOT NULL,
                date TEXT NOT NULL, request_count INTEGER NOT NULL DEFAULT 0,
                last_updated TEXT NOT NULL,
                UNIQUE(user_email, date))""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_github_connections (
                user_email TEXT PRIMARY KEY, github_token TEXT NOT NULL,
                github_username TEXT NOT NULL, connected_at TEXT NOT NULL,
                last_updated TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_github_repo_permissions (
                id SERIAL PRIMARY KEY, user_email TEXT NOT NULL,
                repo_name TEXT NOT NULL, permission_granted INTEGER NOT NULL DEFAULT 1,
                last_updated TEXT NOT NULL, UNIQUE(user_email, repo_name))""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_resumes (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL,
                title TEXT NOT NULL DEFAULT 'Untitled Resume',
                data TEXT NOT NULL DEFAULT '{}', jd TEXT, ats_score INTEGER,
                template_name TEXT, chat_history TEXT DEFAULT '[]',
                created_at TEXT NOT NULL, updated_at TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS user_templates (
                name TEXT PRIMARY KEY, category TEXT NOT NULL DEFAULT 'general',
                config TEXT NOT NULL, section_defs TEXT NOT NULL DEFAULT '[]',
                user_email TEXT, is_system INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS custom_agent_configs (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL, name TEXT NOT NULL,
                description TEXT, skills TEXT NOT NULL, mcp_tools TEXT NOT NULL DEFAULT '[]',
                system_prompt TEXT DEFAULT '', specialization TEXT DEFAULT '',
                last_updated TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS mvp_sessions (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL,
                product_idea TEXT NOT NULL, current_phase_index INTEGER NOT NULL DEFAULT 0,
                mode TEXT NOT NULL DEFAULT 'plan', phases TEXT NOT NULL DEFAULT '[]',
                chat_history TEXT NOT NULL DEFAULT '[]', files TEXT NOT NULL DEFAULT '{}',
                github_connected INTEGER NOT NULL DEFAULT 0, github_repo_name TEXT,
                github_username TEXT, logs TEXT NOT NULL DEFAULT '[]',
                created_at TEXT NOT NULL, updated_at TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS mvp_sessions_archive (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL,
                product_idea TEXT NOT NULL, current_phase_index INTEGER NOT NULL DEFAULT 0,
                mode TEXT NOT NULL DEFAULT 'plan', phases TEXT NOT NULL DEFAULT '[]',
                chat_history TEXT NOT NULL DEFAULT '[]', files TEXT NOT NULL DEFAULT '{}',
                github_connected INTEGER NOT NULL DEFAULT 0, github_repo_name TEXT,
                github_username TEXT, logs TEXT NOT NULL DEFAULT '[]',
                created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
                archived_at TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS job_searches (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL, resume_id TEXT,
                resume_data TEXT NOT NULL, jobs TEXT NOT NULL,
                total_count INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS global_job_cache (
                id TEXT PRIMARY KEY, search_query TEXT NOT NULL,
                jobs TEXT NOT NULL, total_count INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS job_cache_accumulated (
                job_key TEXT PRIMARY KEY, title TEXT NOT NULL, company TEXT NOT NULL,
                location TEXT DEFAULT '', type TEXT DEFAULT '',
                description TEXT DEFAULT '', apply_url TEXT DEFAULT '',
                date_posted TEXT DEFAULT '', salary_range TEXT DEFAULT '',
                match_score INTEGER DEFAULT 0, source TEXT DEFAULT '',
                fetched_at TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS job_fetch_state (
                key TEXT PRIMARY KEY, value TEXT NOT NULL)""")
        c.execute("""
            CREATE TABLE IF NOT EXISTS applied_jobs (
                id TEXT PRIMARY KEY, user_email TEXT NOT NULL, title TEXT NOT NULL,
                company TEXT NOT NULL, location TEXT DEFAULT '', source TEXT DEFAULT '',
                apply_url TEXT DEFAULT '', salary_range TEXT DEFAULT '',
                match_score INTEGER DEFAULT 0, date_posted TEXT DEFAULT '',
                applied_at TEXT NOT NULL)""")


# Module-level singleton
db = Database()
