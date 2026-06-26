"""Test the FULL resume API flow against the active database."""
import os, sys, json
from dotenv import load_dotenv
load_dotenv()

from src.core.database import (
    save_resume, get_resume, get_user_resumes, get_resume_count,
    save_resume_chat_history
)

# 1. Test CREATE
print("=== TEST CREATE ===")
rid = save_resume({
    "id": "api-test-1",
    "user_email": "test@example.com",
    "title": "API Test Resume",
    "data": {"personal_info": {"full_name": "John Doe", "email": "john@test.com"}},
    "jd": None,
    "ats_score": 80,
    "template_name": "Modern Professional"
})
print(f"Created: {rid}")
r = get_resume(rid, "test@example.com")
assert r is not None, "Resume not found after create!"
print(f"  title: {r['title']}, ATS: {r['ats_score']}, template: {r['template_name']}")

# 2. Test UPDATE
print("\n=== TEST UPDATE ===")
r["data"]["personal_info"]["email"] = "john.updated@test.com"
r["title"] = "Updated Title"
r["jd"] = "Software Engineer position at Google"
rid2 = save_resume(r)
print(f"Updated: {rid2}")
r2 = get_resume(rid, "test@example.com")
assert r2 is not None, "Resume not found after update!"
print(f"  email: {r2['data']['personal_info'].get('email')}")
print(f"  jd: {r2['jd']}")

# 3. Test LIST
print("\n=== TEST LIST ===")
resumes = get_user_resumes("test@example.com")
print(f"Total resumes: {len(resumes)}")

# 4. Test CHAT HISTORY
print("\n=== TEST CHAT HISTORY ===")
ok = save_resume_chat_history(rid, "test@example.com", [
    {"role": "user", "content": "hello"},
    {"role": "assistant", "content": "hi there"}
])
assert ok
r3 = get_resume(rid, "test@example.com")
assert len(r3.get("chat_history", [])) == 2

print("All tests passed!")
