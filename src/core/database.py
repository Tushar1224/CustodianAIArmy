import json
import logging
import uuid
import hashlib
from datetime import datetime
from typing import List, Dict, Any, Optional

from .db_backend import db

logger = logging.getLogger(__name__)

DB_PATH = db.db_path

PLAN_LIMITS = {
    "guest": {"daily_limit": 3,  "providers": ["gemini", "anthropic"]},
    "free":  {"daily_limit": 20, "providers": ["gemini", "anthropic"]},
    "pro":   {"daily_limit": 50, "providers": ["gemini", "anthropic"]},
}

ACCUMULATED_JOB_TTL_HOURS = 48


# ── helpers ──────────────────────────────────────────────────────────────

def _now():
    return datetime.utcnow().isoformat()

def _today():
    return datetime.utcnow().strftime("%Y-%m-%d")


# ── init ─────────────────────────────────────────────────────────────────

def init_db():
    try:
        db.init_tables()
        return True
    except Exception as e:
        print(f"Database initialization error: {e}")
        return False


# ── get_db (compat for FastAPI dependency injection) ─────────────────────

def get_db():
    """Return a raw SQLite connection for FastAPI DI. For PostgreSQL, returns None."""
    import sqlite3
    if db._pg_pool:
        return None  # PostgreSQL doesn't support raw connection injection
    return sqlite3.connect(db._db_path, timeout=20)


# ── CHAT SESSIONS ────────────────────────────────────────────────────────

def get_chats_for_user(email: str) -> List[Dict[str, Any]]:
    rows = db.fetchall(
        "SELECT id, user_email, title, start_time, last_updated, messages "
        "FROM chat_sessions WHERE user_email = ? ORDER BY last_updated DESC",
        (email,))
    return [
        {"id": r[0], "user_email": r[1], "title": r[2],
         "start_time": r[3], "last_updated": r[4],
         "messages": json.loads(r[5])}
        for r in rows
    ]

def save_chat_session(chat_data: Dict[str, Any]) -> str:
    chat_id = chat_data.get("id") or str(uuid.uuid4())
    messages_str = json.dumps(chat_data.get("messages", []))
    now = _now()
    start_time = chat_data.get("start_time") or now
    db.execute(
        "INSERT INTO chat_sessions (id, user_email, title, start_time, last_updated, messages) "
        "VALUES (?, ?, ?, ?, ?, ?) "
        "ON CONFLICT(id) DO UPDATE SET "
        "title=excluded.title, last_updated=excluded.last_updated, messages=excluded.messages",
        (chat_id, chat_data.get("user_email", "guest"),
         chat_data.get("title", "New Chat"), start_time, now, messages_str))
    return chat_id

def delete_chat_session(chat_id: str, user_email: str) -> bool:
    cur = db.execute(
        "DELETE FROM chat_sessions WHERE id = ? AND user_email = ?",
        (chat_id, user_email))
    return cur.rowcount > 0


# ── USER API KEYS ────────────────────────────────────────────────────────

def get_user_api_keys(user_email: str) -> Dict[str, Any]:
    row = db.fetchone(
        "SELECT gemini_api_key, anthropic_api_key, last_updated "
        "FROM user_api_keys WHERE user_email = ?", (user_email,))
    if not row:
        return {"gemini_api_key": None, "anthropic_api_key": None,
                "has_gemini": False, "has_anthropic": False, "last_updated": None}

    def mask_key(k):
        if not k: return None
        if len(k) <= 8: return "****"
        return k[:4] + "****" + k[-4:]

    return {
        "gemini_api_key": mask_key(row[0]),
        "anthropic_api_key": mask_key(row[1]),
        "has_gemini": bool(row[0]),
        "has_anthropic": bool(row[1]),
        "last_updated": row[2],
    }

def get_user_api_keys_raw(user_email: str) -> Dict[str, Optional[str]]:
    row = db.fetchone(
        "SELECT gemini_api_key, anthropic_api_key FROM user_api_keys WHERE user_email = ?",
        (user_email,))
    if not row:
        return {"gemini_api_key": None, "anthropic_api_key": None}
    return {"gemini_api_key": row[0], "anthropic_api_key": row[1]}

def save_user_api_keys(user_email: str, keys: Dict[str, Optional[str]]) -> bool:
    try:
        existing = db.fetchone(
            "SELECT gemini_api_key, anthropic_api_key FROM user_api_keys WHERE user_email = ?",
            (user_email,))
        now = _now()
        if existing:
            new_gemini = keys.get("gemini_api_key")
            new_anthropic = keys.get("anthropic_api_key")
            final_gemini = new_gemini if new_gemini is not None else existing[0]
            final_anthropic = new_anthropic if new_anthropic is not None else existing[1]
            final_gemini = None if final_gemini == "" else final_gemini
            final_anthropic = None if final_anthropic == "" else final_anthropic
            db.execute(
                "UPDATE user_api_keys SET gemini_api_key=?, anthropic_api_key=?, last_updated=? "
                "WHERE user_email=?",
                (final_gemini, final_anthropic, now, user_email))
        else:
            db.execute(
                "INSERT INTO user_api_keys (user_email, gemini_api_key, anthropic_api_key, last_updated) "
                "VALUES (?, ?, ?, ?)",
                (user_email, keys.get("gemini_api_key") or None,
                 keys.get("anthropic_api_key") or None, now))
        return True
    except Exception as e:
        print(f"Error saving API keys: {e}")
        return False

def delete_user_api_key(user_email: str, provider: str) -> bool:
    valid = {"gemini": "gemini_api_key", "anthropic": "anthropic_api_key"}
    col = valid.get(provider)
    if not col:
        return False
    try:
        db.execute(f"UPDATE user_api_keys SET {col}=NULL, last_updated=? WHERE user_email=?",
                    (_now(), user_email))
        return True
    except Exception as e:
        print(f"Error deleting API key: {e}")
        return False


# ── USER PROGRESS (used directly in routes.py) ──────────────────────────

def _get_progress_connection():
    """Only needed for routes.py which accesses user_progress directly via raw sqlite3."""
    import sqlite3
    if db._pg_pool:
        raise RuntimeError("Progress uses raw sqlite3; migrate to db.* calls")
    return sqlite3.connect(db._db_path, timeout=20)


# ── PLAN / RATE LIMITING ───────────────────────────────────────────────

def get_user_plan(user_email: str) -> Dict[str, Any]:
    today = _today()
    now_iso = _now()
    row = db.fetchone(
        "SELECT plan, plan_expiry FROM user_plans WHERE user_email = ?", (user_email,))
    if not row:
        db.execute(
            "INSERT INTO user_plans (user_email, plan, requests_today, last_reset_date) "
            "VALUES (?, 'guest', 0, ?)", (user_email, today))
        plan, plan_expiry = "guest", None
    else:
        plan, plan_expiry = row[0], row[1]
        if plan == "pro" and plan_expiry and plan_expiry < now_iso:
            print(f"Plan expired for {user_email} (expired {plan_expiry}), downgrading to free")
            db.execute(
                "UPDATE user_plans SET plan='free', plan_expiry=NULL WHERE user_email=?",
                (user_email,))
            plan, plan_expiry = "free", None

    requests_today = get_daily_request_count(user_email, today)
    limits = PLAN_LIMITS.get(plan, PLAN_LIMITS["guest"])
    return {
        "plan": plan,
        "requests_today": requests_today,
        "daily_limit": limits["daily_limit"],
        "remaining": max(0, limits["daily_limit"] - requests_today),
        "allowed_providers": limits["providers"],
        "plan_expiry": plan_expiry,
    }

def check_and_increment_rate_limit(user_email: str) -> Dict[str, Any]:
    info = get_user_plan(user_email)
    if info["requests_today"] >= info["daily_limit"]:
        info["allowed"] = False
        return info
    new_count = increment_daily_request_count(user_email, _today())
    info["requests_today"] = new_count
    info["remaining"] = max(0, info["daily_limit"] - new_count)
    info["allowed"] = True
    return info

def upgrade_user_plan(user_email: str, new_plan: str, plan_expiry: Optional[str] = None) -> bool:
    if new_plan not in PLAN_LIMITS:
        return False
    try:
        db.execute(
            "INSERT INTO user_plans (user_email, plan, requests_today, last_reset_date, plan_expiry) "
            "VALUES (?, ?, 0, ?, ?) "
            "ON CONFLICT(user_email) DO UPDATE SET plan=excluded.plan, plan_expiry=excluded.plan_expiry",
            (user_email, new_plan, _today(), plan_expiry))
        return True
    except Exception as e:
        print(f"Error upgrading plan: {e}")
        return False

def save_payment(user_email: str, amount: float, plan: str, valid_until: str) -> Optional[str]:
    try:
        payment_id = str(uuid.uuid4())
        db.execute(
            "INSERT INTO payments (id, user_email, amount, currency, plan, status, payment_method, created_at, valid_until) "
            "VALUES (?, ?, ?, 'usd', ?, 'completed', 'demo', ?, ?)",
            (payment_id, user_email, amount, plan, _now(), valid_until))
        return payment_id
    except Exception as e:
        print(f"Error saving payment: {e}")
        return None

def get_daily_request_count(user_email: str, date: str) -> int:
    row = db.fetchone(
        "SELECT request_count FROM daily_requests WHERE user_email=? AND date=?",
        (user_email, date))
    return row[0] if row else 0

def increment_daily_request_count(user_email: str, date: str) -> int:
    now = _now()
    db.execute(
        "INSERT INTO daily_requests (user_email, date, request_count, last_updated) "
        "VALUES (?, ?, 1, ?) "
        "ON CONFLICT(user_email, date) DO UPDATE SET "
        "request_count=request_count+1, last_updated=excluded.last_updated",
        (user_email, date, now))
    row = db.fetchone(
        "SELECT request_count FROM daily_requests WHERE user_email=? AND date=?",
        (user_email, date))
    return row[0] if row else 0


# ── GITHUB CONNECTIONS ──────────────────────────────────────────────────

def save_user_github_connection(user_email: str, github_token: str, github_username: str) -> bool:
    try:
        now = _now()
        db.execute(
            "INSERT INTO user_github_connections (user_email, github_token, github_username, connected_at, last_updated) "
            "VALUES (?, ?, ?, ?, ?) "
            "ON CONFLICT(user_email) DO UPDATE SET "
            "github_token=excluded.github_token, github_username=excluded.github_username, "
            "connected_at=excluded.connected_at, last_updated=excluded.last_updated",
            (user_email, github_token, github_username, now, now))
        return True
    except Exception as e:
        print(f"Error saving GitHub connection: {e}")
        return False

def get_user_github_connection(user_email: str) -> Optional[Dict[str, Any]]:
    row = db.fetchone(
        "SELECT github_token, github_username, connected_at, last_updated "
        "FROM user_github_connections WHERE user_email=?", (user_email,))
    if not row:
        return None

    def mask_token(t):
        if len(t) <= 8: return "****"
        return t[:4] + "****" + t[-4:]

    return {
        "github_username": row[1],
        "github_token_masked": mask_token(row[0]),
        "connected_at": row[2],
        "last_updated": row[3],
    }

def get_user_github_token_raw(user_email: str) -> Optional[str]:
    row = db.fetchone(
        "SELECT github_token FROM user_github_connections WHERE user_email=?", (user_email,))
    return row[0] if row else None

get_user_github_token = get_user_github_token_raw  # alias

def delete_user_github_connection(user_email: str) -> bool:
    try:
        db.execute("DELETE FROM user_github_connections WHERE user_email=?", (user_email,))
        return True
    except Exception as e:
        print(f"Error deleting GitHub connection: {e}")
        return False


# ── GITHUB REPO PERMISSIONS ─────────────────────────────────────────────

def save_user_github_repo_permissions(user_email: str, repo_permissions: List[Dict[str, Any]]) -> bool:
    try:
        db.execute("DELETE FROM user_github_repo_permissions WHERE user_email=?", (user_email,))
        now = _now()
        for perm in repo_permissions:
            db.execute(
                "INSERT INTO user_github_repo_permissions (user_email, repo_name, permission_granted, last_updated) "
                "VALUES (?, ?, ?, ?)",
                (user_email, perm.get("repo_name"), perm.get("permission_granted", True), now))
        return True
    except Exception as e:
        print(f"Error saving repo permissions: {e}")
        return False

def get_user_github_repo_permissions(user_email: str) -> List[Dict[str, Any]]:
    rows = db.fetchall(
        "SELECT repo_name, permission_granted, last_updated "
        "FROM user_github_repo_permissions WHERE user_email=?", (user_email,))
    return [{"repo_name": r[0], "permission_granted": bool(r[1]), "last_updated": r[2]}
            for r in rows]


# ── CUSTOM AGENT CONFIGS ────────────────────────────────────────────────

def save_custom_agent_config(config_data: Dict[str, Any]) -> str:
    agent_id = config_data.get("agent_id") or str(uuid.uuid4())
    skills_str = json.dumps(config_data.get("skills", []))
    mcp_str = json.dumps(config_data.get("mcp_tools", []))
    now = _now()
    db.execute(
        "INSERT INTO custom_agent_configs "
        "(id, user_email, name, description, specialization, skills, mcp_tools, system_prompt, last_updated) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) "
        "ON CONFLICT(id) DO UPDATE SET "
        "name=excluded.name, description=excluded.description, specialization=excluded.specialization, "
        "skills=excluded.skills, mcp_tools=excluded.mcp_tools, system_prompt=excluded.system_prompt, "
        "last_updated=excluded.last_updated",
        (agent_id, config_data.get("user_email"), config_data.get("name", "Unnamed Custom Agent"),
         config_data.get("description", ""), config_data.get("specialization", ""),
         skills_str, mcp_str, config_data.get("system_prompt", ""), now))
    return agent_id

def get_custom_agent_config(user_email: str) -> List[Dict[str, Any]]:
    rows = db.fetchall(
        "SELECT id, name, description, specialization, skills, mcp_tools, system_prompt, last_updated "
        "FROM custom_agent_configs WHERE user_email=? ORDER BY last_updated DESC", (user_email,))
    return [{"id": r[0], "name": r[1], "description": r[2], "specialization": r[3],
             "skills": json.loads(r[4]), "mcp_tools": json.loads(r[5]),
             "system_prompt": r[6], "last_updated": r[7]} for r in rows]

def delete_custom_agent_config(agent_id: str, user_email: str) -> bool:
    cur = db.execute(
        "DELETE FROM custom_agent_configs WHERE id=? AND user_email=?",
        (agent_id, user_email))
    return cur.rowcount > 0


# ── RESUME TEMPLATES ───────────────────────────────────────────────────

def save_template(name: str, config: dict, user_email: Optional[str] = None,
                  category: str = "general", section_defs: Optional[list] = None) -> bool:
    try:
        now = _now()
        db.execute(
            "INSERT INTO user_templates (name, category, config, section_defs, user_email, is_system, created_at) "
            "VALUES (?, ?, ?, ?, ?, 0, ?) "
            "ON CONFLICT(name) DO NOTHING",
            (name, category, json.dumps(config), json.dumps(section_defs or []), user_email, now))
        return True
    except Exception as e:
        print(f"Error saving template: {e}")
        return False

def list_templates(category: Optional[str] = None) -> List[Dict[str, Any]]:
    if category:
        rows = db.fetchall(
            "SELECT name, category, config, section_defs, user_email, is_system, created_at "
            "FROM user_templates WHERE category=? ORDER BY is_system DESC, created_at DESC",
            (category,))
    else:
        rows = db.fetchall(
            "SELECT name, category, config, section_defs, user_email, is_system, created_at "
            "FROM user_templates ORDER BY is_system DESC, created_at DESC")
    return [{"name": r[0], "category": r[1], "config": json.loads(r[2]) if r[2] else {},
             "section_defs": json.loads(r[3]) if r[3] else [],
             "user_email": r[4], "is_system": bool(r[5]), "created_at": r[6]} for r in rows]

def list_template_categories() -> List[str]:
    rows = db.fetchall("SELECT DISTINCT category FROM user_templates ORDER BY category")
    return [r[0] for r in rows]

def get_template_by_name(name: str) -> Optional[Dict[str, Any]]:
    row = db.fetchone(
        "SELECT name, category, config, section_defs, user_email, is_system, created_at "
        "FROM user_templates WHERE name=?", (name,))
    if not row: return None
    return {"name": row[0], "category": row[1], "config": json.loads(row[2]) if row[2] else {},
            "section_defs": json.loads(row[3]) if row[3] else [],
            "user_email": row[4], "is_system": bool(row[5]), "created_at": row[6]}


# ── RESUMES ─────────────────────────────────────────────────────────────

def save_resume(resume_data: Dict[str, Any]) -> str:
    resume_id = resume_data.get("id") or str(uuid.uuid4())
    data_str = json.dumps(resume_data.get("data", {}))
    now = _now()
    chat_history_str = json.dumps(resume_data.get("chat_history", []))
    db.execute(
        "INSERT INTO user_resumes (id, user_email, title, data, jd, ats_score, created_at, updated_at, template_name, chat_history) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) "
        "ON CONFLICT(id) DO UPDATE SET "
        "title=excluded.title, data=excluded.data, jd=excluded.jd, ats_score=excluded.ats_score, "
        "updated_at=excluded.updated_at, template_name=excluded.template_name, chat_history=excluded.chat_history",
        (resume_id, resume_data.get("user_email"), resume_data.get("title", "Untitled Resume"),
         data_str, json.dumps(resume_data.get("jd")) if resume_data.get("jd") else None,
         resume_data.get("ats_score"), resume_data.get("created_at", now), now,
         resume_data.get("template_name"), chat_history_str))
    return resume_id

def get_user_resumes(user_email: str) -> List[Dict[str, Any]]:
    rows = db.fetchall(
        "SELECT id, user_email, title, data, jd, ats_score, created_at, updated_at, template_name, chat_history "
        "FROM user_resumes WHERE user_email=? ORDER BY updated_at DESC", (user_email,))
    return [{"id": r[0], "user_email": r[1], "title": r[2],
             "data": json.loads(r[3]) if r[3] else {},
             "jd": json.loads(r[4]) if r[4] else None,
             "ats_score": r[5], "created_at": r[6], "updated_at": r[7],
             "template_name": r[8],
             "chat_history": json.loads(r[9]) if r[9] else []} for r in rows]

def get_resume(resume_id: str, user_email: str = "") -> Optional[Dict[str, Any]]:
    row = db.fetchone(
        "SELECT id, user_email, title, data, jd, ats_score, created_at, updated_at, template_name, chat_history "
        "FROM user_resumes WHERE id=? AND user_email=?", (resume_id, user_email))
    if not row: return None
    return {"id": row[0], "user_email": row[1], "title": row[2],
            "data": json.loads(row[3]) if row[3] else {},
            "jd": json.loads(row[4]) if row[4] else None,
            "ats_score": row[5], "created_at": row[6], "updated_at": row[7],
            "template_name": row[8],
            "chat_history": json.loads(row[9]) if row[9] else []}

def get_resume_count(user_email: str) -> int:
    row = db.fetchone(
        "SELECT COUNT(*) FROM user_resumes WHERE user_email=?", (user_email,))
    return row[0] if row else 0

def save_resume_chat_history(resume_id: str, user_email: str, chat_history: list) -> bool:
    try:
        cur = db.execute(
            "UPDATE user_resumes SET chat_history=?, updated_at=? WHERE id=? AND user_email=?",
            (json.dumps(chat_history), _now(), resume_id, user_email))
        return cur.rowcount > 0
    except Exception as e:
        print(f"Error saving resume chat history: {e}")
        return False

def delete_resume(resume_id: str, user_email: str) -> bool:
    try:
        cur = db.execute(
            "DELETE FROM user_resumes WHERE id=? AND user_email=?", (resume_id, user_email))
        return cur.rowcount > 0
    except Exception as e:
        print(f"Error deleting resume: {e}")
        return False


# ── MVP SESSIONS ────────────────────────────────────────────────────────

def save_mvp_session(session_data: dict) -> bool:
    try:
        now = _now()
        db.execute(
            "INSERT INTO mvp_sessions (id, user_email, product_idea, current_phase_index, mode, "
            "phases, chat_history, files, github_connected, github_repo_name, github_username, "
            "logs, created_at, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) "
            "ON CONFLICT(id) DO UPDATE SET "
            "current_phase_index=excluded.current_phase_index, mode=excluded.mode, phases=excluded.phases, "
            "chat_history=excluded.chat_history, files=excluded.files, "
            "github_connected=excluded.github_connected, github_repo_name=excluded.github_repo_name, "
            "github_username=excluded.github_username, logs=excluded.logs, updated_at=excluded.updated_at",
            (session_data["id"], session_data["user_email"],
             session_data.get("product_idea", ""), session_data.get("current_phase_index", 0),
             session_data.get("mode", "plan"), json.dumps(session_data.get("phases", [])),
             json.dumps(session_data.get("chat_history", [])),
             json.dumps(session_data.get("files", {})),
             1 if session_data.get("github_connected") else 0,
             session_data.get("github_repo_name"), session_data.get("github_username"),
             json.dumps(session_data.get("logs", [])),
             session_data.get("created_at", now), now))
        return True
    except Exception as e:
        print(f"Error saving MVP session: {e}")
        return False

def get_mvp_session(session_id: str) -> Optional[Dict[str, Any]]:
    row = db.fetchone(
        "SELECT id, user_email, product_idea, current_phase_index, mode, "
        "phases, chat_history, files, github_connected, github_repo_name, "
        "github_username, logs, created_at, updated_at "
        "FROM mvp_sessions WHERE id=?", (session_id,))
    if not row: return None
    return {"id": row[0], "user_email": row[1], "product_idea": row[2],
            "current_phase_index": row[3], "mode": row[4],
            "phases": json.loads(row[5]) if row[5] else [],
            "chat_history": json.loads(row[6]) if row[6] else [],
            "files": json.loads(row[7]) if row[7] else {},
            "github_connected": bool(row[8]), "github_repo_name": row[9],
            "github_username": row[10],
            "logs": json.loads(row[11]) if row[11] else [],
            "created_at": row[12], "updated_at": row[13]}

def list_mvp_sessions(user_email: str) -> List[Dict[str, Any]]:
    rows = db.fetchall(
        "SELECT id, user_email, product_idea, current_phase_index, mode, "
        "phases, chat_history, files, github_connected, github_repo_name, "
        "github_username, logs, created_at, updated_at "
        "FROM mvp_sessions WHERE user_email=? ORDER BY updated_at DESC", (user_email,))
    results = []
    for r in rows:
        results.append({"id": r[0], "user_email": r[1], "product_idea": r[2],
                        "current_phase_index": r[3], "mode": r[4],
                        "phases": json.loads(r[5]) if r[5] else [],
                        "chat_history": json.loads(r[6]) if r[6] else [],
                        "files": json.loads(r[7]) if r[7] else {},
                        "github_connected": bool(r[8]), "github_repo_name": r[9],
                        "github_username": r[10],
                        "logs": json.loads(r[11]) if r[11] else [],
                        "created_at": r[12], "updated_at": r[13]})
    return results

def list_archived_mvp_sessions(user_email: str) -> List[Dict[str, Any]]:
    rows = db.fetchall(
        "SELECT id, user_email, product_idea, current_phase_index, mode, "
        "phases, chat_history, files, github_connected, github_repo_name, "
        "github_username, logs, created_at, updated_at, archived_at "
        "FROM mvp_sessions_archive WHERE user_email=? ORDER BY archived_at DESC", (user_email,))
    results = []
    for r in rows:
        results.append({"id": r[0], "user_email": r[1], "product_idea": r[2],
                        "current_phase_index": r[3], "mode": r[4],
                        "phases": json.loads(r[5]) if r[5] else [],
                        "chat_history": json.loads(r[6]) if r[6] else [],
                        "files": json.loads(r[7]) if r[7] else {},
                        "github_connected": bool(r[8]), "github_repo_name": r[9],
                        "github_username": r[10],
                        "logs": json.loads(r[11]) if r[11] else [],
                        "created_at": r[12], "updated_at": r[13], "archived_at": r[14]})
    return results

def delete_mvp_session(session_id: str, user_email: str) -> bool:
    try:
        # Get the session data
        session = get_mvp_session(session_id)
        if not session:
            return False
        now = _now()
        db.execute(
            "INSERT INTO mvp_sessions_archive "
            "(id, user_email, product_idea, current_phase_index, mode, phases, chat_history, "
            "files, github_connected, github_repo_name, github_username, logs, created_at, updated_at, archived_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (session["id"], session["user_email"], session["product_idea"],
             session["current_phase_index"], session["mode"],
             json.dumps(session["phases"]), json.dumps(session["chat_history"]),
             json.dumps(session["files"]), 1 if session["github_connected"] else 0,
             session["github_repo_name"], session["github_username"],
             json.dumps(session["logs"]), session["created_at"], session["updated_at"], now))
        cur = db.execute(
            "DELETE FROM mvp_sessions WHERE id=? AND user_email=?",
            (session_id, user_email))
        return cur.rowcount > 0
    except Exception as e:
        print(f"Error archiving MVP session: {e}")
        return False


# ── JOB SEARCH ──────────────────────────────────────────────────────────

def save_job_search(user_email: str, resume_id: str, resume_data: dict, jobs: list, total_count: int) -> str:
    search_id = str(uuid.uuid4())
    db.execute(
        "INSERT INTO job_searches (id, user_email, resume_id, resume_data, jobs, total_count, created_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?)",
        (search_id, user_email, resume_id, json.dumps(resume_data), json.dumps(jobs), total_count, _now()))
    return search_id

def get_recent_job_search(user_email: str, resume_id: str) -> Optional[dict]:
    row = db.fetchone(
        "SELECT id, user_email, resume_id, resume_data, jobs, total_count, created_at "
        "FROM job_searches WHERE user_email=? AND resume_id=? ORDER BY created_at DESC LIMIT 1",
        (user_email, resume_id))
    if not row:
        return None
    created = datetime.fromisoformat(row[6])
    if (datetime.utcnow() - created).total_seconds() > 300:
        return None
    return {"id": row[0], "user_email": row[1], "resume_id": row[2],
            "resume_data": json.loads(row[3]), "jobs": json.loads(row[4]),
            "total_count": row[5], "created_at": row[6]}

def save_global_job_cache(search_query: str, jobs: list, total_count: int):
    db.execute("DELETE FROM global_job_cache WHERE search_query=?", (search_query,))
    cache_id = str(uuid.uuid4())
    db.execute(
        "INSERT INTO global_job_cache (id, search_query, jobs, total_count, created_at) "
        "VALUES (?, ?, ?, ?, ?)",
        (cache_id, search_query, json.dumps(jobs), total_count, _now()))

def get_global_job_cache(search_query: str, max_age_seconds: int = 900) -> Optional[dict]:
    row = db.fetchone(
        "SELECT id, search_query, jobs, total_count, created_at "
        "FROM global_job_cache WHERE search_query=? ORDER BY created_at DESC LIMIT 1",
        (search_query,))
    if not row:
        return None
    created = datetime.fromisoformat(row[4])
    if (datetime.utcnow() - created).total_seconds() > max_age_seconds:
        return None
    return {"jobs": json.loads(row[2]), "total_count": row[3], "created_at": row[4]}


# ── ACCUMULATED JOB CACHE ──────────────────────────────────────────────

def add_job_to_accumulated(job: dict):
    title = job.get("title", "")
    company = job.get("company", "")
    source = job.get("source", "")
    job_key = hashlib.md5(
        f"{title}|{company}|{source}".encode()
    ).hexdigest()
    now = _now()
    cur = db.execute(
        "INSERT INTO job_cache_accumulated "
        "(job_key, title, company, location, type, description, apply_url, date_posted, salary_range, match_score, source, fetched_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) "
        "ON CONFLICT(job_key) DO UPDATE SET "
        "title=excluded.title, company=excluded.company, location=excluded.location, "
        "type=excluded.type, description=excluded.description, apply_url=excluded.apply_url, "
        "date_posted=excluded.date_posted, salary_range=excluded.salary_range, "
        "match_score=excluded.match_score, source=excluded.source, fetched_at=excluded.fetched_at",
        (job_key, title, company, job.get("location", ""),
         job.get("type", ""), (job.get("description", "") or "")[:500],
         job.get("apply_url", ""), job.get("date_posted", ""), job.get("salary_range", ""),
         job.get("match_score", 0), source, now))
    if cur:
        action = "NEW" if cur.rowcount == 1 else "UPD"
        logger.info("JOB_DB: %s %s @ %s (%s)", action, title, company, source)

def add_jobs_to_accumulated(jobs: list):
    count = len(jobs)
    for j in jobs:
        add_job_to_accumulated(j)
    total = get_accumulated_job_count()
    logger.info("JOB_DB: batch %d entries processed (total in DB: %d)", count, total)

def get_accumulated_jobs(limit: int = 500, offset: int = 0, since: Optional[str] = None) -> list:
    params = [ACCUMULATED_JOB_TTL_HOURS]
    extra_sql = ""
    if since:
        extra_sql = " AND fetched_at > ?"
        params.append(since)
    params.extend([limit, offset])
    rows = db.fetchall(
        "SELECT title, company, location, type, description, apply_url, date_posted, "
        "salary_range, match_score, source, fetched_at "
        "FROM job_cache_accumulated "
        "WHERE (julianday('now') - julianday(fetched_at)) * 24 < ?" + extra_sql + " "
        "ORDER BY date_posted DESC, fetched_at DESC LIMIT ? OFFSET ?",
        tuple(params))
    result = [{"title": r[0], "company": r[1], "location": r[2], "type": r[3],
               "description": r[4], "apply_url": r[5], "date_posted": r[6],
               "salary_range": r[7], "match_score": r[8], "source": r[9],
               "fetched_at": r[10]} for r in rows]
    logger.info("JOB_DB: query returned %d jobs (limit=%d, since=%s)", len(result), limit, since or "none")
    return result

def get_accumulated_job_count() -> int:
    row = db.fetchone(
        "SELECT COUNT(*) FROM job_cache_accumulated "
        "WHERE (julianday('now') - julianday(fetched_at)) * 24 < ?",
        (ACCUMULATED_JOB_TTL_HOURS,))
    count = row[0] if row else 0
    logger.info("JOB_DB: count = %d", count)
    return count

def get_fetch_state(key: str, default: str = "0") -> str:
    row = db.fetchone(
        "SELECT value FROM job_fetch_state WHERE key=?", (key,))
    return row[0] if row else default

def set_fetch_state(key: str, value: str):
    db.execute(
        "INSERT INTO job_fetch_state (key, value) VALUES (?, ?) "
        "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
        (key, value))

def clear_stale_accumulated():
    cur = db.execute(
        "DELETE FROM job_cache_accumulated "
        "WHERE (julianday('now') - julianday(fetched_at)) * 24 >= ?",
        (ACCUMULATED_JOB_TTL_HOURS,))
    removed = cur.rowcount if cur else 0
    if removed:
        logger.info("JOB_DB: cleared %d stale entries", removed)
    return removed


# ── APPLIED JOBS ────────────────────────────────────────────────────────

def save_applied_job(user_email: str, job: dict) -> str:
    job_id = str(uuid.uuid4())
    now = _now()
    db.execute(
        "INSERT INTO applied_jobs (id, user_email, title, company, location, source, apply_url, "
        "salary_range, match_score, date_posted, applied_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (job_id, user_email, job.get("title", ""), job.get("company", ""),
         job.get("location", ""), job.get("source", ""), job.get("apply_url", ""),
         job.get("salary_range", ""), job.get("match_score", 0),
         job.get("date_posted", ""), now))
    return job_id

def get_applied_jobs(user_email: str) -> list:
    rows = db.fetchall(
        "SELECT id, user_email, title, company, location, source, apply_url, "
        "salary_range, match_score, date_posted, applied_at "
        "FROM applied_jobs WHERE user_email=? ORDER BY applied_at DESC", (user_email,))
    return [{"id": r[0], "user_email": r[1], "title": r[2], "company": r[3],
             "location": r[4], "source": r[5], "apply_url": r[6],
             "salary_range": r[7], "match_score": r[8], "date_posted": r[9],
             "applied_at": r[10]} for r in rows]

def delete_applied_job(job_id: str, user_email: str) -> bool:
    cur = db.execute(
        "DELETE FROM applied_jobs WHERE id=? AND user_email=?", (job_id, user_email))
    return cur.rowcount > 0

def has_applied_job(user_email: str, title: str, company: str) -> bool:
    row = db.fetchone(
        "SELECT COUNT(*) FROM applied_jobs WHERE user_email=? AND title=? AND company=?",
        (user_email, title, company))
    return row is not None and row[0] > 0


# ── sync_applied_jobs ───────────────────────────────────────────────────

def sync_applied_jobs(user_email: str, jobs: list) -> int:
    """Batch upsert applied jobs. Returns count of new entries."""
    count = 0
    for job in jobs:
        if not has_applied_job(user_email, job.get("title", ""), job.get("company", "")):
            save_applied_job(user_email, job)
            count += 1
    return count


# ── USER PROFILE ────────────────────────────────────────────────────────

def get_user_profile(user_email: str) -> Optional[Dict[str, Any]]:
    row = db.fetchone(
        "SELECT user_email, current_course, current_lang, preferences, last_updated "
        "FROM user_profile WHERE user_email=?", (user_email,))
    if not row: return None
    return {"user_email": row[0], "current_course": row[1], "current_lang": row[2],
            "preferences": json.loads(row[3]) if row[3] else {}, "last_updated": row[4]}

def save_user_profile(profile_data: Dict[str, Any]) -> bool:
    try:
        now = _now()
        db.execute(
            "INSERT INTO user_profile (user_email, current_course, current_lang, preferences, last_updated) "
            "VALUES (?, ?, ?, ?, ?) "
            "ON CONFLICT(user_email) DO UPDATE SET "
            "current_course=excluded.current_course, current_lang=excluded.current_lang, "
            "preferences=excluded.preferences, last_updated=excluded.last_updated",
            (profile_data["user_email"], profile_data.get("current_course"),
             profile_data.get("current_lang", "en"),
             json.dumps(profile_data.get("preferences", {})), now))
        return True
    except Exception as e:
        print(f"Error saving profile: {e}")
        return False


# ── Initialize on import ────────────────────────────────────────────────

try:
    init_db()
except Exception as e:
    print(f"Failed to initialize database: {e}")
