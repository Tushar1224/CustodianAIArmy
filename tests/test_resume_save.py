"""Test saving a resume to the active database."""
import os
from dotenv import load_dotenv
load_dotenv()
from src.core.database import save_resume, get_user_resumes, get_resume

resume_id = save_resume({
    "id": "test-resume-1",
    "user_email": "test@example.com",
    "title": "Test Resume",
    "data": {"personal_info": {"full_name": "Test User"}, "skills": []},
    "ats_score": 85,
    "template_name": "Modern Professional"
})
print(f"Saved resume: {resume_id}")

resumes = get_user_resumes("test@example.com")
print(f"Found {len(resumes)} resume(s)")
for r in resumes:
    print(f"  - {r['id']}: {r['title']} (ATS: {r['ats_score']})")

# Test update
r = get_resume("test-resume-1", "test@example.com")
if r:
    r["data"]["personal_info"]["email"] = "test@user.com"
    save_resume(r)
    r2 = get_resume("test-resume-1", "test@example.com")
    print(f"Updated email: {r2['data']['personal_info'].get('email')}")
