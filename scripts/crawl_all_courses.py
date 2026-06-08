"""
Crawl course content from GeeksforGeeks, W3Schools, Javatpoint
and save as knowledge base markdown files in skills/courses/<id>/knowledge/
"""
import asyncio
import json
import os
import re
from urllib.parse import urljoin, urlparse
import httpx
from bs4 import BeautifulSoup

SKILLS_DIR = "skills/courses"

async def fetch_page(url):
    async with httpx.AsyncClient(timeout=30, follow_redirects=True) as client:
        resp = await client.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        resp.raise_for_status()
        return resp.text

def extract_content(html, base_url):
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "iframe", "noscript", "svg", "form", "input", "button"]):
        tag.decompose()

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    body = soup.find("article") or soup.find("main") or soup.find("body") or soup
    content_parts = []
    links = []

    for el in body.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "pre", "table", "blockquote", "dl", "code"]):
        tag = el.name
        text = el.get_text(strip=True)
        if not text:
            continue

        if tag.startswith("h"):
            level = tag[1]
            anchor = el.find("a", class_="anchor")
            content_parts.append(f"\n{'#' * int(level)} {text}\n")
        elif tag == "p":
            content_parts.append(f"{text}\n")
        elif tag in ("ul", "ol"):
            for li in el.find_all("li", recursive=False):
                li_text = li.get_text(strip=True)
                if li_text:
                    prefix = "- " if tag == "ul" else "1. "
                    content_parts.append(f"{prefix}{li_text}")
            content_parts.append("")
        elif tag == "pre" or tag == "code":
            code_text = el.get_text()
            if len(code_text) > 20:
                content_parts.append(f"```\n{code_text}\n```\n")

    for a_tag in body.find_all("a", href=True):
        href = a_tag["href"]
        if href.startswith("#") or href.startswith("javascript:") or href.startswith("mailto:"):
            continue
        full_url = urljoin(base_url, href)
        parsed = urlparse(full_url)
        if parsed.scheme in ("http", "https") and parsed.netloc == urlparse(base_url).netloc:
            link_text = a_tag.get_text(strip=True)
            if link_text and len(link_text) > 3:
                links.append((link_text, full_url))

    markdown = f"# {title}\n\n" if title else ""
    markdown += "\n".join(content_parts)
    markdown = re.sub(r'\n{3,}', '\n\n', markdown)
    return markdown, links

async def crawl_course(url, limit=15):
    visited = set()
    to_visit = [(url, "")]
    results = []

    while to_visit and len(visited) < limit:
        current_url, _ = to_visit.pop(0)
        if current_url in visited:
            continue
        visited.add(current_url)

        try:
            print(f"  Fetching: {current_url}")
            html = await fetch_page(current_url)
            markdown, links = extract_content(html, current_url)
        except Exception as e:
            print(f"  FAILED: {current_url} - {e}")
            continue

        heading = f"\n## Source: {current_url}\n" if len(visited) > 1 else ""
        results.append(f"{heading}{markdown}")

        for link_text, link_url in links:
            if link_url not in visited and len(visited) + len(to_visit) < limit:
                to_visit.append((link_url, link_text))

    return "\n\n---\n\n".join(results)

async def save_course_content(course_id, url, section_name, limit=10):
    print(f"\nCrawling {section_name} for {course_id} from {url}")
    knowledge_dir = os.path.join(SKILLS_DIR, course_id, "knowledge")
    os.makedirs(knowledge_dir, exist_ok=True)
    content = await crawl_course(url, limit=limit)
    safe_name = re.sub(r'[^a-z0-9-]', '-', section_name.lower()).strip('-')
    filepath = os.path.join(knowledge_dir, f"{safe_name}-en.md")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Saved {len(content)} chars to {filepath}")
    return filepath

async def main():
    tasks = [
        # Frontend courses
        save_course_content("frontend-html", "https://www.w3schools.com/html/", "html-basics", limit=8),
        save_course_content("frontend-css", "https://www.w3schools.com/css/", "css-basics", limit=8),

        # JavaScript courses
        save_course_content("javascript-es-2015", "https://www.w3schools.com/js/js_es6.asp", "es2015-features", limit=5),
        save_course_content("javascript-async-and-network-requests", "https://www.w3schools.com/js/js_async.asp", "async-javascript", limit=5),
        save_course_content("javascript-testing", "https://www.geeksforgeeks.org/javascript-testing/", "testing", limit=5),

        # React courses
        save_course_content("react", "https://www.w3schools.com/react/", "react-basics", limit=8),
        save_course_content("react-redux", "https://www.w3schools.com/react/react_redux.asp", "redux", limit=5),

        # Python courses
        save_course_content("python-beginner", "https://www.w3schools.com/python/", "python-basics", limit=8),
        save_course_content("python-intermediate", "https://www.geeksforgeeks.org/python-programming-language/", "python-intermediate", limit=8),
        save_course_content("python-advanced", "https://www.geeksforgeeks.org/advanced-python-tutorials/", "python-advanced", limit=8),
        save_course_content("python-data-science-1-overview-and-numpy", "https://www.w3schools.com/python/numpy/", "numpy", limit=6),
        save_course_content("python-data-science-2-pyplot", "https://www.w3schools.com/python/matplotlib/", "matplotlib", limit=6),
        save_course_content("python-data-science-3-pandas", "https://www.w3schools.com/python/pandas/", "pandas", limit=6),
        save_course_content("python-data-science-4-machine-learning", "https://www.w3schools.com/python/python_ml_getting_started.asp", "machine-learning", limit=6),
        save_course_content("python-data-science-5-neural-networks", "https://www.geeksforgeeks.org/introduction-to-neural-networks/", "neural-networks", limit=6),

        # Backend / tools
        save_course_content("node-and-npm", "https://www.w3schools.com/nodejs/", "nodejs", limit=8),
        save_course_content("git", "https://www.w3schools.com/git/", "git", limit=6),
        save_course_content("http", "https://www.geeksforgeeks.org/http-full-form/", "http-protocol", limit=5),
        save_course_content("databases-datastore", "https://www.w3schools.com/sql/", "sql-basics", limit=8),

        # Extra enrichment
        save_course_content("typescript", "https://www.w3schools.com/typescript/", "typescript", limit=6),
        save_course_content("react-advanced", "https://www.geeksforgeeks.org/react-js-advanced-concepts/", "react-advanced", limit=6),
        save_course_content("python-in-practice", "https://realpython.com/", "python-practice", limit=6),
        save_course_content("terminal-basics", "https://www.w3schools.com/linux/", "linux-terminal", limit=6),
    ]

    results = await asyncio.gather(*tasks, return_exceptions=True)
    success = 0
    fail = 0
    for r in results:
        if isinstance(r, Exception):
            print(f"  ERROR: {r}")
            fail += 1
        else:
            success += 1
    print(f"\nDone! {success} succeeded, {fail} failed")

if __name__ == "__main__":
    asyncio.run(main())
