"""
MCP Server: crawl_course_pathway
Crawls tutorial websites (W3Schools, GeeksforGeeks, Javatpoint) to extract
full learning pathways as clean Markdown for the knowledge base.

Usage:
  python scripts/crawl_course_pathway_mcp.py

Registers tool:
  crawl_course_pathway(url, limit=10) -> markdown content
"""
import asyncio
import json
import sys
from urllib.parse import urljoin, urlparse
import httpx
from bs4 import BeautifulSoup

COURSE_SKILLS_DIR = "skills/courses"

async def fetch_page(url: str) -> str:
    async with httpx.AsyncClient(timeout=30, follow_redirects=True) as client:
        resp = await client.get(url, headers={"User-Agent": "CustodianAI-Crawler/1.0"})
        resp.raise_for_status()
        return resp.text

def extract_content(html: str, base_url: str) -> tuple[str, list[str]]:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "iframe", "noscript"]):
        tag.decompose()

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    body = soup.find("body") or soup
    content_parts = []
    links = []

    for el in body.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "pre", "table", "blockquote", "dl"]):
        tag = el.name
        text = el.get_text(strip=True)

        if tag.startswith("h"):
            level = tag[1]
            content_parts.append(f"\n{'#' * int(level)} {text}\n")
        elif tag == "p" and text:
            content_parts.append(f"{text}\n")
        elif tag in ("ul", "ol"):
            for li in el.find_all("li", recursive=False):
                li_text = li.get_text(strip=True)
                if li_text:
                    prefix = "- " if tag == "ul" else "1. "
                    content_parts.append(f"{prefix}{li_text}")
            content_parts.append("")
        elif tag == "pre":
            code = el.get_text()
            content_parts.append(f"```\n{code}\n```\n")
        elif tag == "table":
            rows = el.find_all("tr")
            md_rows = []
            for row in rows:
                cells = row.find_all(["th", "td"])
                md_rows.append("| " + " | ".join(c.get_text(strip=True) for c in cells) + " |")
            if md_rows:
                content_parts.append("\n".join(md_rows) + "\n")
        elif tag == "blockquote":
            content_parts.append(f"> {text}\n")

    for a_tag in body.find_all("a", href=True):
        href = a_tag["href"]
        full_url = urljoin(base_url, href)
        parsed = urlparse(full_url)
        if parsed.scheme in ("http", "https") and parsed.netloc == urlparse(base_url).netloc:
            link_text = a_tag.get_text(strip=True)
            if link_text and not any(skip in href for skip in ("#", "javascript:", "mailto:")):
                links.append((link_text, full_url))

    markdown = f"# {title}\n\n" if title else ""
    markdown += "\n".join(content_parts)
    return markdown, links


async def crawl_course_pathway(url: str, limit: int = 10) -> str:
    visited = set()
    to_visit = [(url, "")]
    results = []
    link_idx = 0

    while to_visit and len(visited) < limit:
        current_url, parent_title = to_visit.pop(0)
        if current_url in visited:
            continue
        visited.add(current_url)

        try:
            html = await fetch_page(current_url)
            markdown, links = extract_content(html, current_url)
        except Exception as e:
            results.append(f"\n## Failed to fetch: {current_url}\n> Error: {e}\n")
            continue

        heading = f"\n## Source: {current_url}\n" if len(visited) > 1 else ""
        results.append(f"{heading}{markdown}")

        for link_text, link_url in links:
            if link_url not in visited and len(visited) + len(to_visit) < limit:
                to_visit.append((link_url, link_text))

    return "\n\n---\n\n".join(results)


# ── MCP Server (stdio) ───────────────────────────────────────────────────────

async def handle_mcp_message(msg: dict) -> dict:
    msg_id = msg.get("id")
    method = msg.get("method")
    params = msg.get("params", {})

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": msg_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {
                        "crawl_course_pathway": {
                            "description": "Crawls a starting URL (like W3Schools or GeeksforGeeks) to extract a full learning pathway. Returns clean Markdown content for the knowledge base.",
                            "inputSchema": {
                                "type": "object",
                                "properties": {
                                    "url": {
                                        "type": "string",
                                        "description": "The starting URL of the course or tutorial series."
                                    },
                                    "limit": {
                                        "type": "integer",
                                        "description": "Maximum number of pages to crawl. Default 10.",
                                        "default": 10
                                    }
                                },
                                "required": ["url"]
                            }
                        }
                    }
                },
                "serverInfo": {
                    "name": "crawl-course-pathway",
                    "version": "1.0.0"
                }
            }
        }

    if method == "tools/call":
        tool_name = params.get("name")
        arguments = params.get("arguments", {})
        if tool_name == "crawl_course_pathway":
            url = arguments["url"]
            limit = arguments.get("limit", 10)
            try:
                content = await crawl_course_pathway(url, limit)
                return {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [{"type": "text", "text": content}],
                        "isError": False
                    }
                }
            except Exception as e:
                return {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [{"type": "text", "text": f"Error: {str(e)}"}],
                        "isError": True
                    }
                }

    return {"jsonrpc": "2.0", "id": msg_id, "error": {"code": -32601, "message": f"Method not found: {method}"}}


async def main():
    while True:
        line = await asyncio.get_event_loop().run_in_executor(None, sys.stdin.readline)
        if not line:
            break
        msg = json.loads(line.strip())
        response = await handle_mcp_message(msg)
        sys.stdout.write(json.dumps(response) + "\n")
        sys.stdout.flush()


if __name__ == "__main__":
    asyncio.run(main())
