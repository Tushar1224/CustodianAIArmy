"""End-to-end test: all DB flows against the active database."""
import os, sys, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dotenv import load_dotenv
load_dotenv()

from src.core.database import (
    save_resume, get_resume, get_user_resumes,
    save_chat_session, get_chats_for_user,
    save_resume_chat_history,
    save_template, get_template_by_name, list_templates,
    add_jobs_to_accumulated, get_accumulated_jobs,
    increment_daily_request_count,
    upgrade_user_plan, get_user_plan
)
from datetime import datetime

EMAIL = "flowtest@example.com"

print("=" * 60)
print("FULL DATABASE FLOW VERIFICATION")
print("=" * 60)

# 1. Chat Sessions
print("\n[1/6] Chat Sessions...")
cid = save_chat_session({
    "id": "flow-test-chat-1", "user_email": EMAIL,
    "title": "Flow Test Chat", "agent_name": "CustodianAI",
    "messages": [{"role": "user", "content": "test"}]
})
chats = get_chats_for_user(EMAIL)
assert any(c["id"] == cid for c in chats), "Chat not found!"
assert chats[0].get("agent_name") == "CustodianAI"
print("  [OK] Chat saved & retrieved with agent_name")

# 2. Resumes
print("\n[2/6] Resumes...")
rid = save_resume({
    "id": "flow-test-resume-1", "user_email": EMAIL,
    "title": "Flow Test Resume",
    "data": {"personal_info": {"full_name": "Flow Test"}, "skills": []},
    "jd": "Looking for a Python developer", "ats_score": 90,
    "template_name": "Modern Professional"
})
r = get_resume(rid, EMAIL)
assert r is not None
r["data"]["personal_info"]["email"] = "flow@test.com"
save_resume(r)
r2 = get_resume(rid, EMAIL)
assert r2["data"]["personal_info"]["email"] == "flow@test.com"
print("  [OK] Resume CRUD works")

# 3. Resume Chat History
print("\n[3/6] Resume Chat History...")
ok = save_resume_chat_history(rid, EMAIL, [
    {"role": "user", "content": "optimize"},
    {"role": "assistant", "content": "done"}
])
assert ok
r3 = get_resume(rid, EMAIL)
assert len(r3["chat_history"]) == 2
print("  [OK] Chat history saved & retrieved")

# 4. Templates
print("\n[4/6] Templates...")
save_template("Flow Test Template", {"font": "Arial"}, EMAIL, "professional", [{"id": "summary", "name": "Summary"}])
t = get_template_by_name("Flow Test Template")
assert t is not None and t["category"] == "professional"
templates = list_templates()
assert len(templates) >= 1
print("  [OK] Template CRUD works")

# 5. Jobs (accumulated)
print("\n[5/6] Jobs (accumulated)...")
add_jobs_to_accumulated([{
    "job_key": f"flow-test-job-{i}", "title": f"Flow Test Job {i}",
    "company": "Test Corp", "location": "Remote", "type": "Full-time",
    "description": "A test job", "apply_url": "https://example.com",
    "date_posted": datetime.utcnow().isoformat(), "salary_range": "$100k-$150k",
    "match_score": 85, "source": "linkedin", "fetched_at": datetime.utcnow().isoformat()
} for i in range(3)])
jobs = get_accumulated_jobs(limit=10)
assert len(jobs) >= 3
print("  [OK] Jobs accumulate & retrieve")

# 6. Last chat for agent
print("\n[6/6] Last Chat for Agent...")
from src.core.database import get_last_chat_for_agent
last = get_last_chat_for_agent(EMAIL, "CustodianAI")
assert last is not None
assert last["agent_name"] == "CustodianAI"
print(f"  [OK] Last chat for CustodianAI found: {last['title']}")

print("\n" + "=" * 60)
print("ALL FLOWS VERIFIED SUCCESSFULLY!")
print("=" * 60)
