"""Copy data from local SQLite to Supabase PostgreSQL."""
import os, sqlite3, hashlib
from dotenv import load_dotenv
import psycopg2

load_dotenv()
src = sqlite3.connect("custodian.db")
src.row_factory = sqlite3.Row
conn = psycopg2.connect(os.environ["DATABASE_URL"])
cur = conn.cursor()

rows = src.execute("SELECT * FROM job_cache_accumulated").fetchall()
batch = []
total = len(rows)
for i, r in enumerate(rows):
    d = dict(r)
    job_key = hashlib.md5(f"{d['title']}|{d['company']}|{d['source']}".encode()).hexdigest()
    batch.append((
        job_key, d["title"], d["company"], d["location"], d["type"],
        d["description"], d["apply_url"], d["date_posted"],
        d["salary_range"], d["match_score"], d["source"], d["fetched_at"]
    ))
    if len(batch) >= 200:
        cur.executemany("""
            INSERT INTO job_cache_accumulated
            (job_key, title, company, location, type, description, apply_url,
             date_posted, salary_range, match_score, source, fetched_at)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            ON CONFLICT(job_key) DO NOTHING
        """, batch)
        conn.commit()
        print(f"  ... {i+1}/{total}")
        batch = []

if batch:
    cur.executemany("""
        INSERT INTO job_cache_accumulated
        (job_key, title, company, location, type, description, apply_url,
         date_posted, salary_range, match_score, source, fetched_at)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        ON CONFLICT(job_key) DO NOTHING
    """, batch)
    conn.commit()

cur.execute("SELECT COUNT(*) FROM job_cache_accumulated")
print(f"Migrated {total} jobs (total in PG: {cur.fetchone()[0]})")

# Migrate user_plans
rows = src.execute("SELECT * FROM user_plans").fetchall()
for r in rows:
    d = dict(r)
    cur.execute("""
        INSERT INTO user_plans (user_email, plan, requests_today, last_reset_date, plan_expiry)
        VALUES (%s,%s,%s,%s,%s)
        ON CONFLICT(user_email) DO UPDATE SET
            plan=EXCLUDED.plan, plan_expiry=EXCLUDED.plan_expiry
    """, (d["user_email"], d["plan"], d["requests_today"], d["last_reset_date"], d.get("plan_expiry")))
conn.commit()
print(f"Migrated {len(rows)} user plans")

conn.close()
src.close()
print("Done!")
