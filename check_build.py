import os, re
d = 'frontend/dist'
print('Files in dist:')
for f in os.listdir(d):
    fp = os.path.join(d, f)
    print(f'  {f} ({"dir" if os.path.isdir(fp) else "file"})')
if os.path.isdir(f'{d}/assets'):
    print('Assets:')
    for f in os.listdir(f'{d}/assets'):
        print(f'  {f}')
html = open(f'{d}/index.html').read()
print()
print('References in dist/index.html:')
for m in re.findall(r'(?:src|href)="/?([^"]+)"', html):
    exists = os.path.exists(os.path.join(d, m))
    print(f'  {m} -> exists={exists}')
