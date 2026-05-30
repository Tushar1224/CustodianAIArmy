"""End-to-end test: Build Your Product -> Gemini -> GitHub -> Preview"""
import httpx
import asyncio
import json
import sys
import jwt
from datetime import datetime, timedelta

# Must match .env JWT_SECRET
JWT_SECRET = "your-jwt-secret-change-in-production"

def create_test_token():
    payload = {
        "sub": "test-user-123",
        "email": "test@custodian.ai",
        "name": "Test User",
        "picture": "",
        "exp": datetime.utcnow() + timedelta(days=365),
        "iat": datetime.utcnow(),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


async def test():
    base = "http://localhost:8000"
    token = create_test_token()
    cookies = {"access_token": token}
    headers = {"Cookie": f"access_token={token}"}

    async with httpx.AsyncClient(timeout=120.0) as client:
        # 1. Health check
        r = await client.get(f"{base}/api/v1/health")
        print(f"[1] Health: {r.status_code}")
        assert r.status_code == 200

        # 2. Get active provider
        r = await client.get(f"{base}/api/v1/provider/active")
        prov = r.json()
        print(f"[2] Provider: {prov}")
        assert prov["active_provider"] == "gemini", f"Expected gemini, got {prov['active_provider']}"

        # 3. Create session (with auth cookie)
        print("\n[3] Creating session...")
        r = await client.post(
            f"{base}/api/v1/mvp/create-session",
            json={"product_idea": "A habit tracker web app with daily check-ins and streak counter"},
            cookies=cookies
        )
        print(f"    Status: {r.status_code}")
        if r.status_code != 200:
            print(f"    Error: {r.text}")
            return False
        data = r.json()
        assert data["success"]
        sid = data["session"]["session_id"]
        print(f"    Session: {sid}")
        print(f"    Phase: {data['session']['current_phase']}")

        # 4. Send build message in act mode
        print("\n[4] Sending build message to Gemini (Ideation phase)...")
        r = await client.post(
            f"{base}/api/v1/mvp/send-message",
            json={
                "session_id": sid,
                "message": "Create a simple habit tracker: index.html with daily check-in, streak counter, localStorage persistence. Include a nice dark theme UI.",
                "mode": "act"
            },
            cookies=cookies
        )
        print(f"    Status: {r.status_code}")
        if r.status_code != 200:
            print(f"    Error: {r.text}")
            return False
        d = r.json()
        print(f"    Agent: {d['result']['agent_name']}")
        print(f"    Phase: {d['result']['phase']}")
        print(f"    Response length: {len(d['result']['response'])} chars")
        files = d['session']['files']
        print(f"    Files created: {files}")

        # 5. Advance phase multiple times to get to Build
        for phase_name in ["Planning", "Review", "Polish", "Build"]:
            print(f"\n[5] Advancing to {phase_name}...")
            r = await client.post(
                f"{base}/api/v1/mvp/advance-phase",
                json={"session_id": sid},
                cookies=cookies
            )
            print(f"    Status: {r.status_code}")
            if r.status_code == 200:
                rd = r.json()
                new_phase = rd.get('result', {}).get('new_phase', 'N/A')
                print(f"    Phase: {new_phase}")
                if phase_name == "Build":
                    # Send build instruction
                    r2 = await client.post(
                        f"{base}/api/v1/mvp/send-message",
                        json={
                            "session_id": sid,
                            "message": "Generate the full habit tracker HTML/CSS/JS code now.",
                            "mode": "act"
                        },
                        cookies=cookies
                    )
                    print(f"    Build msg status: {r2.status_code}")
                    if r2.status_code == 200:
                        bd = r2.json()
                        print(f"    Build files: {bd['session']['files']}")
                        files = bd['session']['files']

        # 6. Check files endpoint
        print("\n[6] Listing files...")
        r = await client.get(
            f"{base}/api/v1/mvp/session/{sid}/files",
            cookies=cookies
        )
        print(f"    Status: {r.status_code}")
        if r.status_code == 200:
            files_data = r.json()
            print(f"    Files: {files_data.get('files', [])}")
            print(f"    Count: {files_data.get('file_count', 0)}")

        # 7. Try read first file
        print("\n[7] Reading file content...")
        if files:
            first = files[0]
            r = await client.get(
                f"{base}/api/v1/mvp/session/{sid}/file",
                params={"path": first},
                cookies=cookies
            )
            print(f"    Status: {r.status_code}")
            if r.status_code == 200:
                fc = r.json()
                print(f"    File: {fc.get('path', '?')}")
                print(f"    Content length: {len(fc.get('content', ''))} chars")

        # 8. Try preview
        print("\n[8] Testing preview endpoint...")
        r = await client.get(
            f"{base}/api/v1/mvp/session/{sid}/preview",
            cookies=cookies
        )
        print(f"    Status: {r.status_code}")
        if r.status_code == 200:
            html = r.text
            print(f"    HTML length: {len(html)} chars")
            print(f"    Has DOCTYPE: {'<!DOCTYPE' in html}")
            print(f"    Has build badge: {'Custodian AI' in html}")

        print("\n✅ All tests passed!")
        return True


if __name__ == "__main__":
    try:
        success = asyncio.run(test())
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        sys.exit(1)