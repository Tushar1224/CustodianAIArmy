import sqlite3, json
c = sqlite3.connect('custodian.db')
row = c.execute('SELECT id, title, data FROM user_resumes').fetchone()
print(f'ID: {row[0]}')
print(f'Title: {row[1]}')
data = json.loads(row[2])
pi = data.get('personal_info', {})
print(f'Current role: {pi.get("title", "N/A")}')
print(f'Full name: {pi.get("full_name", "N/A")}')
