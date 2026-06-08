"""Rebuild course.json for all courses — keep only files with real content."""
import json, os, re

for cid in sorted(os.listdir('courses')):
    cpath = os.path.join('courses', cid, 'course.json')
    kpath = os.path.join('courses', cid, 'knowledge')
    if not os.path.isfile(cpath) or not os.path.isdir(kpath):
        continue
    
    files = sorted([f for f in os.listdir(kpath) if f.endswith('-en.md') and os.path.isfile(os.path.join(kpath, f))])
    
    def has_content(f):
        fp = os.path.join(kpath, f)
        size = os.path.getsize(fp)
        if size < 200:
            return False
        if size < 300:
            with open(fp, encoding='utf-8') as fh:
                content = fh.read().strip()
            if len(content) < 100:
                return False
        return True
    
    good_files = [f for f in files if has_content(f)]
    
    def title_from_file(f):
        name = f.replace('-en.md', '').replace('-', ' ').strip()
        name = re.sub(r'^[\d\s]+', '', name).strip()
        parts = name.split(' ', 1)
        if len(parts) > 1 and parts[0].isdigit():
            name = parts[1]
        if not name:
            name = f.replace('-en.md', '')
            name = re.sub(r'^[\d-]+', '', name).replace('-', ' ').strip()
        return name[0].upper() + name[1:] if name else 'Overview'
    
    sections = [{'file': f, 'title': title_from_file(f)} for f in good_files]
    
    with open(cpath) as f:
        data = json.load(f)
    old_count = len(data.get('langs', {}).get('en', {}).get('sections', []))
    data['langs']['en']['sections'] = sections
    data['slide_count'] = len(sections)
    with open(cpath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    delta = len(sections) - old_count
    sign = '+' if delta >= 0 else ''
    if delta != 0:
        print(f'{cid}: {old_count} -> {len(sections)} ({sign}{delta})')
