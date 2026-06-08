"""Crawl all W3Schools HTML tutorial pages and save as course knowledge."""
import asyncio, os, re
import httpx
from bs4 import BeautifulSoup

SKILLS = "courses/frontend-html/knowledge"

async def fetch(url):
    async with httpx.AsyncClient(timeout=25, follow_redirects=True) as client:
        r = await client.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        r.raise_for_status()
        return r.text

async def save(name, url):
    try:
        html = await fetch(url)
        soup = BeautifulSoup(html, "html.parser")
        for t in soup(["script","style","nav","footer","header","aside","iframe","noscript","svg","form"]):
            t.decompose()
        main = soup.find("article") or soup.find("div",class_="w3-main") or soup.find("body")
        text = main.get_text(separator="\n", strip=True) if main else soup.get_text(separator="\n", strip=True)
        lines = [l for l in text.split("\n") if len(l.strip())>3]
        content = "\n".join(lines[:300])
        path = os.path.join(SKILLS, f"w3-{name}-en.md")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            title = name.replace("-", " ").title()
            f.write(f"# HTML {title}\n\nSource: {url}\n\n{content}\n")
        print(f"  OK {name} ({len(content)} chars)")
    except Exception as e:
        print(f"  ERR {name}: {e}")

TOPICS = [
    ("intro","https://www.w3schools.com/html/html_intro.asp"),
    ("editors","https://www.w3schools.com/html/html_editors.asp"),
    ("basics","https://www.w3schools.com/html/html_basic.asp"),
    ("elements","https://www.w3schools.com/html/html_elements.asp"),
    ("attributes","https://www.w3schools.com/html/html_attributes.asp"),
    ("headings","https://www.w3schools.com/html/html_headings.asp"),
    ("paragraphs","https://www.w3schools.com/html/html_paragraphs.asp"),
    ("styles","https://www.w3schools.com/html/html_styles.asp"),
    ("formatting","https://www.w3schools.com/html/html_formatting.asp"),
    ("comments","https://www.w3schools.com/html/html_comments.asp"),
    ("colors","https://www.w3schools.com/html/html_colors.asp"),
    ("links","https://www.w3schools.com/html/html_links.asp"),
    ("images","https://www.w3schools.com/html/html_images.asp"),
    ("favicon","https://www.w3schools.com/html/html_favicon.asp"),
    ("tables","https://www.w3schools.com/html/html_tables.asp"),
    ("lists","https://www.w3schools.com/html/html_lists.asp"),
    ("blocks","https://www.w3schools.com/html/html_blocks.asp"),
    ("classes","https://www.w3schools.com/html/html_classes.asp"),
    ("id","https://www.w3schools.com/html/html_id.asp"),
    ("iframe","https://www.w3schools.com/html/html_iframe.asp"),
    ("javascript","https://www.w3schools.com/html/html_scripts.asp"),
    ("filepaths","https://www.w3schools.com/html/html_filepaths.asp"),
    ("head","https://www.w3schools.com/html/html_head.asp"),
    ("layout","https://www.w3schools.com/html/html_layout.asp"),
    ("responsive","https://www.w3schools.com/html/html_responsive.asp"),
    ("computercode","https://www.w3schools.com/html/html_computercode_elements.asp"),
    ("semantics","https://www.w3schools.com/html/html5_semantic_elements.asp"),
    ("entities","https://www.w3schools.com/html/html_entities.asp"),
    ("symbols","https://www.w3schools.com/html/html_symbols.asp"),
    ("emojis","https://www.w3schools.com/html/html_emojis.asp"),
    ("charset","https://www.w3schools.com/html/html_charset.asp"),
    ("url-encode","https://www.w3schools.com/html/html_urlencode.asp"),
    ("xhtml","https://www.w3schools.com/html/html_xhtml.asp"),
    ("forms","https://www.w3schools.com/html/html_forms.asp"),
    ("form-elements","https://www.w3schools.com/html/html_form_elements.asp"),
    ("form-input-types","https://www.w3schools.com/html/html_form_input_types.asp"),
    ("form-attributes","https://www.w3schools.com/html/html_form_attributes.asp"),
    ("canvas","https://www.w3schools.com/html/html5_canvas.asp"),
    ("svg","https://www.w3schools.com/html/html5_svg.asp"),
    ("video","https://www.w3schools.com/html/html5_video.asp"),
    ("audio","https://www.w3schools.com/html/html5_audio.asp"),
    ("drag-drop","https://www.w3schools.com/html/html5_draganddrop.asp"),
    ("web-storage","https://www.w3schools.com/html/html5_webstorage.asp"),
    ("web-workers","https://www.w3schools.com/html/html5_webworkers.asp"),
    ("sse","https://www.w3schools.com/html/html5_serversentevents.asp"),
    ("geolocation","https://www.w3schools.com/html/html5_geolocation.asp"),
]

async def main():
    print("Crawling W3Schools HTML tutorials (%d pages)..." % len(TOPICS))
    tasks = [save(name, url) for name, url in TOPICS]
    await asyncio.gather(*tasks)
    print("Done! %d pages crawled" % len(TOPICS))

asyncio.run(main())
