"""Crawl ALL courses from TutorialsPoint, GeeksforGeeks, and W3Schools."""
import asyncio, os, re
import httpx
from bs4 import BeautifulSoup

async def fetch(url):
    async with httpx.AsyncClient(timeout=25, follow_redirects=True) as client:
        r = await client.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        r.raise_for_status()
        return r.text

async def save(cid, name, url):
    try:
        html = await fetch(url)
        soup = BeautifulSoup(html, "html.parser")
        for t in soup(["script","style","nav","footer","header","aside","iframe","noscript","svg","form"]):
            t.decompose()
        main = soup.find("article") or soup.find("main") or soup.find("div",class_="entry-content") or soup.find("body")
        text = main.get_text(separator="\n", strip=True) if main else soup.get_text(separator="\n", strip=True)
        lines = [l for l in text.split("\n") if len(l.strip())>3]
        content = "\n".join(lines[:500])
        if len(content) < 200:
            return
        path = "courses/" + cid + "/knowledge/" + name + "-en.md"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write("# " + name.replace("-"," ").title() + "\n\nSource: " + url + "\n\n" + content + "\n")
        print("OK", cid, name, len(content))
    except Exception as e:
        print("ERR", cid, name, str(e)[:60])

# All courses × multiple sources
ALL = [
    # CSS (more W3Schools pages)
    ("frontend-css", "w3-css-howto", "https://www.w3schools.com/css/css_howto.asp"),
    ("frontend-css", "w3-css-backgrounds", "https://www.w3schools.com/css/css_background.asp"),
    ("frontend-css", "w3-css-borders", "https://www.w3schools.com/css/css_border.asp"),
    ("frontend-css", "w3-css-margins", "https://www.w3schools.com/css/css_margin.asp"),
    ("frontend-css", "w3-css-padding", "https://www.w3schools.com/css/css_padding.asp"),
    ("frontend-css", "w3-css-height-width", "https://www.w3schools.com/css/css_dimension.asp"),
    ("frontend-css", "w3-css-text", "https://www.w3schools.com/css/css_text.asp"),
    ("frontend-css", "w3-css-fonts", "https://www.w3schools.com/css/css_font.asp"),
    ("frontend-css", "w3-css-display", "https://www.w3schools.com/css/css_display_visibility.asp"),
    ("frontend-css", "w3-css-position", "https://www.w3schools.com/css/css_positioning.asp"),
    ("frontend-css", "w3-css-overflow", "https://www.w3schools.com/css/css_overflow.asp"),
    ("frontend-css", "w3-css-float", "https://www.w3schools.com/css/css_float.asp"),
    ("frontend-css", "w3-css-combinators", "https://www.w3schools.com/css/css_combinators.asp"),
    ("frontend-css", "w3-css-pseudo-class", "https://www.w3schools.com/css/css_pseudo_classes.asp"),
    ("frontend-css", "w3-css-pseudo-elem", "https://www.w3schools.com/css/css_pseudo_elements.asp"),
    ("frontend-css", "w3-css-opacity", "https://www.w3schools.com/css/css_image_transparency.asp"),
    ("frontend-css", "w3-css-navbar", "https://www.w3schools.com/css/css_navbar.asp"),
    ("frontend-css", "w3-css-dropdowns", "https://www.w3schools.com/css/css_dropdowns.asp"),
    ("frontend-css", "w3-css-gallery", "https://www.w3schools.com/css/css_image_gallery.asp"),
    ("frontend-css", "w3-css-forms", "https://www.w3schools.com/css/css_form.asp"),
    ("frontend-css", "w3-css-countners", "https://www.w3schools.com/css/css_counters.asp"),
    ("frontend-css", "w3-css-media-queries", "https://www.w3schools.com/css/css3_mediaqueries.asp"),
    ("frontend-css", "tutorialspoint-css-advanced", "https://www.tutorialspoint.com/css/css3_animations.htm"),
    
    # JavaScript
    ("javascript-es-2015", "tutorialspoint-es6", "https://www.tutorialspoint.com/es6/es6_quick_guide.htm"),
    
    # Python
    ("python-beginner", "tutorialspoint-python-basics", "https://www.tutorialspoint.com/python/python_basic_syntax.htm"),
    ("python-beginner", "tutorialspoint-python-variables", "https://www.tutorialspoint.com/python/python_variable_types.htm"),
    ("python-beginner", "tutorialspoint-python-operators", "https://www.tutorialspoint.com/python/python_operators.htm"),
    ("python-beginner", "tutorialspoint-python-decision", "https://www.tutorialspoint.com/python/python_decision_making.htm"),
    ("python-beginner", "tutorialspoint-python-loops", "https://www.tutorialspoint.com/python/python_loops.htm"),
    ("python-beginner", "tutorialspoint-python-strings", "https://www.tutorialspoint.com/python/python_strings.htm"),
    ("python-beginner", "tutorialspoint-python-lists", "https://www.tutorialspoint.com/python/python_lists.htm"),
    ("python-beginner", "tutorialspoint-python-tuples", "https://www.tutorialspoint.com/python/python_tuples.htm"),
    ("python-beginner", "tutorialspoint-python-dict", "https://www.tutorialspoint.com/python/python_dictionary.htm"),
    ("python-beginner", "tutorialspoint-python-functions", "https://www.tutorialspoint.com/python/python_functions.htm"),
    ("python-beginner", "tutorialspoint-python-modules", "https://www.tutorialspoint.com/python/python_modules.htm"),
    ("python-beginner", "tutorialspoint-python-files", "https://www.tutorialspoint.com/python/python_files_io.htm"),
    ("python-beginner", "tutorialspoint-python-exceptions", "https://www.tutorialspoint.com/python/python_exceptions.htm"),
    ("python-beginner", "tutorialspoint-python-classes", "https://www.tutorialspoint.com/python/python_classes_objects.htm"),
    ("python-beginner", "tutorialspoint-python-inheritance", "https://www.tutorialspoint.com/python/python_inheritance.htm"),
    
    # Python Data Science
    ("python-data-science-3-pandas", "tutorialspoint-pandas", "https://www.tutorialspoint.com/python_pandas/index.htm"),
    
    # React
    ("react", "tutorialspoint-react-env", "https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm"),
    ("react", "tutorialspoint-react-jsx", "https://www.tutorialspoint.com/reactjs/reactjs_jsx.htm"),
    ("react", "tutorialspoint-react-components", "https://www.tutorialspoint.com/reactjs/reactjs_components.htm"),
    ("react", "tutorialspoint-react-state", "https://www.tutorialspoint.com/reactjs/reactjs_state.htm"),
    ("react", "tutorialspoint-react-props", "https://www.tutorialspoint.com/reactjs/reactjs_props_overview.htm"),
    ("react", "tutorialspoint-react-lifecycle", "https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm"),
    ("react", "tutorialspoint-react-events", "https://www.tutorialspoint.com/reactjs/reactjs_events.htm"),
    ("react", "tutorialspoint-react-router", "https://www.tutorialspoint.com/reactjs/reactjs_router.htm"),
    ("react", "tutorialspoint-react-forms", "https://www.tutorialspoint.com/reactjs/reactjs_forms.htm"),
    ("react", "tutorialspoint-react-hooks", "https://www.tutorialspoint.com/reactjs/reactjs_hooks.htm"),
    
    # Node.js
    ("node-and-npm", "tutorialspoint-node-npm", "https://www.tutorialspoint.com/nodejs/nodejs_npm.htm"),
    ("node-and-npm", "tutorialspoint-node-callback", "https://www.tutorialspoint.com/nodejs/nodejs_callbacks_concept.htm"),
    ("node-and-npm", "tutorialspoint-node-events", "https://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm"),
    ("node-and-npm", "tutorialspoint-node-streams", "https://www.tutorialspoint.com/nodejs/nodejs_streams.htm"),
    
    # Databases
    ("databases-datastore", "tutorialspoint-sql-joins", "https://www.tutorialspoint.com/sql/sql-joins.htm"),
    ("databases-datastore", "tutorialspoint-sql-constraints", "https://www.tutorialspoint.com/sql/sql-constraints.htm"),
    ("databases-datastore", "tutorialspoint-mongodb", "https://www.tutorialspoint.com/mongodb/index.htm"),
    
    # HTTP
    ("http", "tutorialspoint-http-messages", "https://www.tutorialspoint.com/http/http_messages.htm"),
    ("http", "tutorialspoint-http-status", "https://www.tutorialspoint.com/http/http_status_codes.htm"),
    ("http", "tutorialspoint-http-methods", "https://www.tutorialspoint.com/http/http_methods.htm"),
    ("http", "tutorialspoint-http-headers", "https://www.tutorialspoint.com/http/http_header_fields.htm"),
    ("http", "tutorialspoint-http-caching", "https://www.tutorialspoint.com/http/http_caching.htm"),
    ("http", "tutorialspoint-http-auth", "https://www.tutorialspoint.com/http/http_authentication.htm"),
    ("http", "tutorialspoint-http-security", "https://www.tutorialspoint.com/http/http_security.htm"),
    ("http", "tutorialspoint-https", "https://www.tutorialspoint.com/http/http_https.htm"),
    
    # Git
    ("git", "tutorialspoint-git-lifecycle", "https://www.tutorialspoint.com/git/git_life_cycle.htm"),
    ("git", "tutorialspoint-git-create", "https://www.tutorialspoint.com/git/git_create_operation.htm"),
    ("git", "tutorialspoint-git-branch", "https://www.tutorialspoint.com/git/git_branch_management.htm"),
    ("git", "tutorialspoint-git-merge", "https://www.tutorialspoint.com/git/git_merge_operation.htm"),
    ("git", "tutorialspoint-git-remote", "https://www.tutorialspoint.com/git/git_remote_operation.htm"),
    
    # Terminal
    ("terminal-basics", "tutorialspoint-unix-directories", "https://www.tutorialspoint.com/unix/unix-directories.htm"),
    ("terminal-basics", "tutorialspoint-unix-files", "https://www.tutorialspoint.com/unix/unix-file-management.htm"),
    ("terminal-basics", "tutorialspoint-unix-permissions", "https://www.tutorialspoint.com/unix/unix-file-permission.htm"),
    ("terminal-basics", "tutorialspoint-unix-processes", "https://www.tutorialspoint.com/unix/unix-processes.htm"),
    ("terminal-basics", "tutorialspoint-unix-vi", "https://www.tutorialspoint.com/unix/unix-vi-editor.htm"),
    ("terminal-basics", "tutorialspoint-unix-pipes", "https://www.tutorialspoint.com/unix/unix-pipes-filters.htm"),
    ("terminal-basics", "tutorialspoint-unix-grep", "https://www.tutorialspoint.com/unix/unix-regular-expressions.htm"),
    ("terminal-basics", "tutorialspoint-unix-shell", "https://www.tutorialspoint.com/unix/unix-shell-quoting.htm"),
    
    # TypeScript
    ("typescript", "tutorialspoint-ts-types", "https://www.tutorialspoint.com/typescript/typescript_types.htm"),
    ("typescript", "tutorialspoint-ts-variables", "https://www.tutorialspoint.com/typescript/typescript_variables.htm"),
    ("typescript", "tutorialspoint-ts-functions", "https://www.tutorialspoint.com/typescript/typescript_functions.htm"),
    ("typescript", "tutorialspoint-ts-classes", "https://www.tutorialspoint.com/typescript/typescript_classes.htm"),
    ("typescript", "tutorialspoint-ts-interfaces", "https://www.tutorialspoint.com/typescript/typescript_interfaces.htm"),
    ("typescript", "tutorialspoint-ts-generics", "https://www.tutorialspoint.com/typescript/typescript_generics.htm"),
    ("typescript", "tutorialspoint-ts-modules", "https://www.tutorialspoint.com/typescript/typescript_modules.htm"),
    
    # JavaScript Testing
    ("javascript-testing", "tutorialspoint-jest", "https://www.tutorialspoint.com/jest/index.htm"),
]

async def main():
    print("Crawling %d pages..." % len(ALL))
    tasks = [save(cid, name, url) for cid, name, url in ALL]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    ok = sum(1 for r in results if r is None)
    err = sum(1 for r in results if isinstance(r, Exception))
    print("\nDone! %d OK, %d errors" % (ok, err))

asyncio.run(main())
