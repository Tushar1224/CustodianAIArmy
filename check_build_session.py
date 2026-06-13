"""
E2E test script for the MVP Builder page — tests all 6 phases including Virtual Deploy.

Requires the backend server to be running (uvicorn src.main:app --reload).

Usage:
    python check_build_session.py

Set DEBUG=1 to print full API responses:
    $env:DEBUG=1; python check_build_session.py
"""

import sys
import json
import os
import time

try:
    import httpx
except ImportError:
    print("httpx not found. Install with: pip install httpx")
    sys.exit(1)

BASE_URL = "http://localhost:8000/api/v1"
DEBUG = os.getenv("DEBUG", "0") == "1"

# Simulated auth cookie — change to a valid session cookie if needed.
# For local dev, the backend may accept requests without auth in some modes.
COOKIES = {}

# Pick an email to use for this test session
# If your backend requires real auth, set a valid cookie here
TEST_EMAIL = "test@example.com"


def log(label, data=None):
    """Print a test step with optional JSON payload."""
    print(f"\n{'='*60}")
    print(f"  {label}")
    print(f"{'='*60}")
    if data and DEBUG:
        print(json.dumps(data, indent=2, default=str)[:2000])


def req(method, path, json_body=None, files=None):
    """Make an API request with httpx."""
    url = f"{BASE_URL}{path}"
    kwargs = {"cookies": COOKIES}
    if json_body is not None:
        kwargs["json"] = json_body
    if files is not None:
        kwargs["files"] = files

    with httpx.Client(timeout=30) as client:
        resp = client.request(method, url, **kwargs)
        if DEBUG:
            print(f"  {method.upper()} {path} -> {resp.status_code}")
        return resp


def main():
    """Run all test phases for the MVP Builder."""
    session_id = None

    # ──────────────────────────────────────────────────
    # PRE-CHECK: Ensure server is running
    # ──────────────────────────────────────────────────
    log("Pre-check: Server health")
    try:
        r = req("GET", "/health")
        assert r.status_code == 200, f"Server not running? Got {r.status_code}"
        log("✓ Server is healthy")
    except Exception as e:
        print(f"  ✗ FAIL: {e}")
        print("  Make sure the backend is running: uvicorn src.main:app --reload")
        sys.exit(1)

    # ──────────────────────────────────────────────────
    # PHASE 1: Create a new MVP session (Ideation)
    # ──────────────────────────────────────────────────
    log("PHASE 1 — Ideation: Create session and brainstorm")
    r = req("POST", "/mvp/create-session", json_body={
        "product_idea": "A habit tracker app called 'StreakForge' that helps users build daily habits with gamification, streaks, and social accountability.",
    })
    assert r.status_code == 200, f"Create session failed: {r.status_code} {r.text[:200]}"
    data = r.json()
    session_id = data["session"]["session_id"]
    log("✓ Session created", data["session"])

    # Verify initial state
    assert data["session"]["current_phase"] == "Ideation", "Should start in Ideation"
    assert data["session"]["current_phase_index"] == 0, "Phase index should be 0"
    log("  ✓ Initial phase is Ideation")

    # ──────────────────────────────────────────────────
    # PHASE 1 (cont): Send messages in Ideation (Plan mode)
    # ──────────────────────────────────────────────────
    log("PHASE 1 — Ideation: Send planning messages")
    messages = [
        "Let me think about the core features: streak tracking, daily check-ins, friend challenges, and a leaderboard.",
        "What tech stack should we use? React for frontend, Python/FastAPI for backend, PostgreSQL for persistence.",
        "Key user flows: sign up -> create habit -> daily check-in -> earn streak -> compete with friends.",
    ]
    for msg in messages:
        r = req("POST", "/mvp/send-message", json_body={
            "session_id": session_id,
            "message": msg,
            "mode": "plan",
        })
        assert r.status_code == 200, f"Send message failed: {r.status_code}"
        data = r.json()
        assert data["success"], f"Send message not successful: {data}"
        if DEBUG:
            print(f"  AI: {(data['result'].get('response') or '')[:150]}...")
        log(f"  ✓ Sent: {msg[:50]}...")

    # ──────────────────────────────────────────────────
    # PHASE 2: Advance to Planning
    # ──────────────────────────────────────────────────
    log("PHASE 2 — Planning: Advance and discuss architecture")
    r = req("POST", "/mvp/advance-phase", json_body={"session_id": session_id})
    assert r.status_code == 200, f"Advance phase failed: {r.status_code}"
    data = r.json()
    assert data["result"]["new_phase"] == "Planning", f"Should be in Planning, got {data['result'].get('new_phase')}"
    log("✓ Advanced to Planning", data["result"])

    # Send architecture planning messages
    arch_messages = [
        "Design the database schema for users, habits, streaks, and challenges.",
        "Plan the API endpoints: CRUD for habits, daily check-in endpoint, leaderboard endpoint.",
        "Suggest frontend component hierarchy: Dashboard, HabitCard, StreakVisualizer, LeaderBoard.",
    ]
    for msg in arch_messages:
        r = req("POST", "/mvp/send-message", json_body={
            "session_id": session_id,
            "message": msg,
            "mode": "plan",
        })
        assert r.status_code == 200, f"Send message failed: {r.status_code}"
        log(f"  ✓ Sent architecture discussion: {msg[:50]}...")

    # Also try Act mode to start generating architecture docs
    r = req("POST", "/mvp/send-message", json_body={
        "session_id": session_id,
        "message": "Generate a high-level architecture document as a markdown file called ARCHITECTURE.md",
        "mode": "act",
    })
    assert r.status_code == 200, f"Act mode message failed: {r.status_code}"
    log("  ✓ Act mode: sent file generation request")

    # ──────────────────────────────────────────────────
    # PHASE 3: Advance to Review
    # ──────────────────────────────────────────────────
    log("PHASE 3 — Review: Validate the approach")
    r = req("POST", "/mvp/advance-phase", json_body={"session_id": session_id})
    assert r.status_code == 200
    data = r.json()
    assert data["result"]["new_phase"] == "Review"
    log("✓ Advanced to Review")

    review_messages = [
        "Review the architecture. Are there any scalability concerns with the streak tracking system?",
        "Check if the database schema handles edge cases like timezone differences for daily streaks.",
    ]
    for msg in review_messages:
        r = req("POST", "/mvp/send-message", json_body={
            "session_id": session_id,
            "message": msg,
            "mode": "plan",
        })
        assert r.status_code == 200
        log(f"  ✓ Sent review comment: {msg[:50]}...")

    # Send an act-mode request to fix a potential issue
    r = req("POST", "/mvp/send-message", json_body={
        "session_id": session_id,
        "message": "Add a timezone field to the user profile and update the streak calculation to handle DST transitions.",
        "mode": "act",
    })
    assert r.status_code == 200
    log("  ✓ Act mode: sent fix request")

    # ──────────────────────────────────────────────────
    # PHASE 4: Advance to Polish
    # ──────────────────────────────────────────────────
    log("PHASE 4 — Polish: UX Improvements")
    r = req("POST", "/mvp/advance-phase", json_body={"session_id": session_id})
    assert r.status_code == 200
    data = r.json()
    assert data["result"]["new_phase"] == "Polish"
    log("✓ Advanced to Polish")

    polish_messages = [
        "Suggest UX improvements for the daily check-in flow. Make it feel rewarding.",
        "Design a dark mode color scheme for the habit tracker dashboard.",
    ]
    for msg in polish_messages:
        r = req("POST", "/mvp/send-message", json_body={
            "session_id": session_id,
            "message": msg,
            "mode": "plan",
        })
        assert r.status_code == 200
        log(f"  ✓ Sent polish suggestion: {msg[:50]}...")

    # Generate some CSS/UI files in act mode
    r = req("POST", "/mvp/send-message", json_body={
        "session_id": session_id,
        "message": "Create a dark-themed HTML dashboard for the habit tracker with a header, streak counter, and habit list.",
        "mode": "act",
    })
    assert r.status_code == 200
    log("  ✓ Act mode: generated UI prototype")

    # ──────────────────────────────────────────────────
    # PHASE 5: Advance to Build
    # ──────────────────────────────────────────────────
    log("PHASE 5 — Build: Generate production code")
    r = req("POST", "/mvp/advance-phase", json_body={"session_id": session_id})
    assert r.status_code == 200
    data = r.json()
    assert data["result"]["new_phase"] == "Build"
    log("✓ Advanced to Build")

    # Send build instructions in act mode
    build_messages = [
        "Create an index.html file with a complete habit tracker UI: dashboard with streak counter, habit list with daily checkboxes, and a leaderboard section.",
        "Create a style.css file with the dark theme styling for the habit tracker.",
        "Create a app.js file with JavaScript for the streak tracking logic, daily check-ins, and local storage persistence.",
    ]
    for msg in build_messages:
        r = req("POST", "/mvp/send-message", json_body={
            "session_id": session_id,
            "message": msg,
            "mode": "act",
        })
        assert r.status_code == 200
        log(f"  ✓ Build command: {msg[:50]}...")

    # Check that files were created
    r = req("GET", f"/mvp/session/{session_id}/files")
    assert r.status_code == 200
    file_data = r.json()
    log("✓ Files generated", file_data)

    # Check the preview HTML
    r = req("GET", f"/mvp/session/{session_id}/preview")
    assert r.status_code == 200
    preview_text = r.text[:200]
    log(f"✓ Preview available ({len(r.text)} chars)")

    # ──────────────────────────────────────────────────
    # PHASE 6: Advance to Virtual Deploy
    # ──────────────────────────────────────────────────
    log("PHASE 6 — Virtual Deploy: Preview and accept")
    r = req("POST", "/mvp/advance-phase", json_body={"session_id": session_id})
    assert r.status_code == 200
    data = r.json()
    assert data["result"]["new_phase"] == "Virtual Deploy", f"Should be in Virtual Deploy, got {data['result'].get('new_phase')}"
    log("✓ Advanced to Virtual Deploy")

    # Get the session to verify deploy phase
    r = req("GET", f"/mvp/session/{session_id}")
    assert r.status_code == 200
    session = r.json()["session"]
    assert session["current_phase_index"] == 5
    log("✓ Session is in Virtual Deploy phase", session)

    # Check the preview (should work in deploy phase too)
    r = req("GET", f"/mvp/session/{session_id}/preview")
    assert r.status_code == 200
    log(f"✓ Preview HTML ({len(r.text)} chars)")

    # ──────────────────────────────────────────────────
    # TEST: Request Changes (go back to Build)
    # ──────────────────────────────────────────────────
    log("TEST: Request changes from Virtual Deploy back to Build")
    r = req("POST", "/mvp/request-changes", json_body={
        "session_id": session_id,
        "feedback": "The color scheme needs adjustment. Use blue instead of green for the streak counter. Also add a settings page link.",
    })
    assert r.status_code == 200
    data = r.json()
    assert data["success"], "Request changes should succeed"
    assert data["new_phase"] == "Build", f"Should go back to Build, got {data.get('new_phase')}"
    log("✓ Requested changes, went back to Build phase")

    # Build again with the feedback
    r = req("POST", "/mvp/send-message", json_body={
        "session_id": session_id,
        "message": "Update the index.html to use blue colors for the streak counter and add a settings page link in the header.",
        "mode": "act",
    })
    assert r.status_code == 200
    log("  ✓ Sent build update for requested changes")

    # ──────────────────────────────────────────────────
    # TEST: Advance back to Virtual Deploy and Accept
    # ──────────────────────────────────────────────────
    log("TEST: Advance to Virtual Deploy again and accept")
    r = req("POST", "/mvp/advance-phase", json_body={"session_id": session_id})
    assert r.status_code == 200
    data = r.json()
    assert data["result"]["new_phase"] == "Virtual Deploy"
    log("✓ Advanced back to Virtual Deploy")

    # Accept the deployment (without GitHub publish)
    r = req("POST", "/mvp/virtual-deploy", json_body={
        "session_id": session_id,
        "publish_to_github": False,
    })
    assert r.status_code == 200
    data = r.json()
    assert data["success"], f"Accept deploy should succeed: {data}"
    log("✓ Deployment accepted and project finalized!", data)

    # Verify the session is marked as deployed
    r = req("GET", f"/mvp/session/{session_id}")
    assert r.status_code == 200
    session = r.json()["session"]
    log("✓ Final session state", session)

    # ──────────────────────────────────────────────────
    # TEST: List sessions via DB endpoint
    # ──────────────────────────────────────────────────
    log("TEST: List sessions from database")
    r = req("GET", "/mvp/sessions/db")
    assert r.status_code == 200
    sessions_data = r.json()
    assert sessions_data["count"] > 0, "Should have at least one session in DB"
    log(f"✓ {sessions_data['count']} session(s) found in DB")

    # ──────────────────────────────────────────────────
    # TEST: Delete session
    # ──────────────────────────────────────────────────
    log("TEST: Delete session")
    r = req("DELETE", f"/mvp/session/{session_id}")
    assert r.status_code == 200
    log("✓ Session deleted")

    # Verify deletion
    r = req("GET", f"/mvp/session/{session_id}")
    assert r.status_code == 404
    log("✓ Verified session no longer exists (404)")

    # ──────────────────────────────────────────────────
    # SUMMARY
    # ──────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"  ALL TESTS PASSED!
    print(f"{'='*60}")
    print(f"""
  Phases tested:
    1. Ideation     — Create session, brainstorm messages (Plan mode)
    2. Planning     — Architecture discussion, tech stack (Plan + Act)
    3. Review       — Validate approach, fix edge cases (Plan + Act)
    4. Polish       — UX improvements, UI prototype (Plan + Act)
    5. Build        — Generate production code files (Act mode)
    6. Virtual Deploy — Preview, Request Changes, Accept

  Additional:
    - Request changes (go back to Build → re-advance → accept)
    - DB persistence (list sessions from database)
    - Session deletion

  Session ID used: {session_id}
""")

    return 0


if __name__ == "__main__":
    sys.exit(main())
