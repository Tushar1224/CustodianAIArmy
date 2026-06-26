import os
from dotenv import load_dotenv
load_dotenv()

url = os.getenv("DATABASE_URL", "")
print(f"DATABASE_URL = {url[:50]}..." if len(url) > 50 else f"DATABASE_URL = {url!r}")

if url.startswith("postgresql://") or url.startswith("postgres://"):
    try:
        import psycopg2
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT version();")
        print(f"Connected! PostgreSQL version: {cur.fetchone()[0]}")
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;")
        tables = [r[0] for r in cur.fetchall()]
        print(f"Tables ({len(tables)}): {', '.join(tables)}")
        cur.execute("SELECT COUNT(*) FROM job_cache_accumulated;")
        count = cur.fetchone()[0]
        print(f"job_cache_accumulated rows: {count}")
        conn.close()
    except Exception as e:
        print(f"CONNECTION FAILED: {e}")
else:
    print("Not a PostgreSQL URL — check .env")
