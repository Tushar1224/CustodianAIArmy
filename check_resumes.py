import urllib.request, json
try:
    r = urllib.request.urlopen('http://localhost:8000/api/v1/resumes', timeout=5)
    data = json.loads(r.read())
    print(f'Backend OK: {r.status}')
    print(f'Resumes: {len(data.get("resumes", []))}')
    for res in data.get('resumes', []):
        pi = res.get('data', {}).get('personal_info', {})
        print(f'  - {res.get("id")}: {res.get("title", "untitled")} (role: {pi.get("title", "N/A")})')
except Exception as e:
    print(f'Error: {e}')
