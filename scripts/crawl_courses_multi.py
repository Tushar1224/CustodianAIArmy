"""
Crawl each course from multiple tutorial websites and save as knowledge base markdown.
"""
import asyncio, json, os, re, httpx
from bs4 import BeautifulSoup

SKILLS_DIR = "skills/courses"

async def fetch(url):
    async with httpx.AsyncClient(timeout=25, follow_redirects=True) as client:
        r = await client.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        r.raise_for_status()
        return r.text

def extract_text(html, url):
    soup = BeautifulSoup(html, "html.parser")
    for t in soup(["script","style","nav","footer","header","aside","iframe","noscript","svg","form","input","button","select","label"]):
        t.decompose()
    main = soup.find("article") or soup.find("main") or soup.find("body") or soup
    text = main.get_text(separator="\n", strip=True)
    if len(text) < 500:
        text = soup.get_text(separator="\n", strip=True)
    lines = [l for l in text.split("\n") if len(l.strip()) > 3]
    return "\n".join(lines[:500])

async def save_course(course_id, section, url):
    try:
        html = await fetch(url)
        text = extract_text(html, url)
        if len(text) < 100:
            return
        safe = re.sub(r"[^a-z0-9-]+", "-", section.lower()).strip("-")
        path = os.path.join(SKILLS_DIR, course_id, "knowledge", f"{safe}-en.md")
        with open(path, "w", encoding="utf-8") as f:
            f.write(f"# {section}\n\nSource: {url}\n\n{text}\n")
        print(f"  OK  {course_id}/{section} ({len(text)} chars)")
    except Exception as e:
        print(f"  ERR {course_id}/{section}: {e}")

SOURCES = [
    # Python Beginner
    ("python-beginner", "w3schools-python-intro", "https://www.w3schools.com/python/python_intro.asp"),
    ("python-beginner", "w3schools-python-getstarted", "https://www.w3schools.com/python/python_getstarted.asp"),
    ("python-beginner", "w3schools-python-syntax", "https://www.w3schools.com/python/python_syntax.asp"),
    ("python-beginner", "w3schools-python-variables", "https://www.w3schools.com/python/python_variables.asp"),
    ("python-beginner", "w3schools-python-datatypes", "https://www.w3schools.com/python/python_datatypes.asp"),
    ("python-beginner", "w3schools-python-strings", "https://www.w3schools.com/python/python_strings.asp"),
    ("python-beginner", "w3schools-python-lists", "https://www.w3schools.com/python/python_lists.asp"),
    ("python-beginner", "w3schools-python-ifelse", "https://www.w3schools.com/python/python_conditions.asp"),
    ("python-beginner", "w3schools-python-while", "https://www.w3schools.com/python/python_while_loops.asp"),
    ("python-beginner", "w3schools-python-for", "https://www.w3schools.com/python/python_for_loops.asp"),
    ("python-beginner", "w3schools-python-functions", "https://www.w3schools.com/python/python_functions.asp"),
    ("python-beginner", "tutorialspoint-python", "https://www.tutorialspoint.com/python/index.htm"),
    ("python-beginner", "geeksforgeeks-python-intro", "https://www.geeksforgeeks.org/python-programming-language-tutorial/"),

    # Python Intermediate
    ("python-intermediate", "w3schools-python-lambda", "https://www.w3schools.com/python/python_lambda.asp"),
    ("python-intermediate", "w3schools-python-arrays", "https://www.w3schools.com/python/python_arrays.asp"),
    ("python-intermediate", "w3schools-python-classes", "https://www.w3schools.com/python/python_classes.asp"),
    ("python-intermediate", "w3schools-python-iterators", "https://www.w3schools.com/python/python_iterators.asp"),
    ("python-intermediate", "w3schools-python-modules", "https://www.w3schools.com/python/python_modules.asp"),
    ("python-intermediate", "tutorialspoint-python-intermediate", "https://www.tutorialspoint.com/python/python_functions.htm"),
    ("python-intermediate", "geeksforgeeks-python-oop", "https://www.geeksforgeeks.org/python-oops-concepts/"),
    ("python-intermediate", "geeksforgeeks-python-exceptions", "https://www.geeksforgeeks.org/python-exception-handling/"),
    ("python-intermediate", "geeksforgeeks-python-file", "https://www.geeksforgeeks.org/file-handling-python/"),

    # Python Advanced
    ("python-advanced", "geeksforgeeks-python-decorators", "https://www.geeksforgeeks.org/decorators-in-python/"),
    ("python-advanced", "geeksforgeeks-python-generators", "https://www.geeksforgeeks.org/generators-in-python/"),
    ("python-advanced", "geeksforgeeks-python-context", "https://www.geeksforgeeks.org/context-managers-in-python/"),
    ("python-advanced", "geeksforgeeks-python-logging", "https://www.geeksforgeeks.org/logging-in-python/"),
    ("python-advanced", "geeksforgeeks-python-unittest", "https://www.geeksforgeeks.org/unit-testing-python-unittest/"),
    ("python-advanced", "tutorialspoint-python-advanced", "https://www.tutorialspoint.com/python/python_reg_expressions.htm"),
    ("python-advanced", "geeksforgeeks-python-multithreading", "https://www.geeksforgeeks.org/multithreading-in-python-set-1/"),

    # Python in Practice
    ("python-in-practice", "geeksforgeeks-python-webscraping", "https://www.geeksforgeeks.org/python-web-scraping-tutorial/"),
    ("python-in-practice", "geeksforgeeks-python-api", "https://www.geeksforgeeks.org/python-api-tutorial/"),
    ("python-in-practice", "geeksforgeeks-python-json", "https://www.geeksforgeeks.org/read-json-file-using-python/"),
    ("python-in-practice", "geeksforgeeks-python-csv", "https://www.geeksforgeeks.org/working-csv-files-python/"),

    # Python Data Science
    ("python-data-science-1-overview-and-numpy", "w3schools-numpy-intro", "https://www.w3schools.com/python/numpy/numpy_intro.asp"),
    ("python-data-science-1-overview-and-numpy", "w3schools-numpy-array", "https://www.w3schools.com/python/numpy/numpy_creating_arrays.asp"),
    ("python-data-science-1-overview-and-numpy", "w3schools-numpy-indexing", "https://www.w3schools.com/python/numpy/numpy_array_indexing.asp"),
    ("python-data-science-1-overview-and-numpy", "tutorialspoint-numpy", "https://www.tutorialspoint.com/numpy/index.htm"),
    ("python-data-science-1-overview-and-numpy", "geeksforgeeks-numpy", "https://www.geeksforgeeks.org/python-numpy/"),

    ("python-data-science-2-pyplot", "w3schools-matplotlib-intro", "https://www.w3schools.com/python/matplotlib_intro.asp"),
    ("python-data-science-2-pyplot", "w3schools-matplotlib-pyplot", "https://www.w3schools.com/python/matplotlib_pyplot.asp"),
    ("python-data-science-2-pyplot", "w3schools-matplotlib-bars", "https://www.w3schools.com/python/matplotlib_bars.asp"),
    ("python-data-science-2-pyplot", "w3schools-matplotlib-hist", "https://www.w3schools.com/python/matplotlib_histograms.asp"),
    ("python-data-science-2-pyplot", "geeksforgeeks-matplotlib", "https://www.geeksforgeeks.org/python-introduction-matplotlib/"),

    ("python-data-science-3-pandas", "w3schools-pandas-intro", "https://www.w3schools.com/python/pandas/pandas_intro.asp"),
    ("python-data-science-3-pandas", "w3schools-pandas-series", "https://www.w3schools.com/python/pandas/pandas_series.asp"),
    ("python-data-science-3-pandas", "w3schools-pandas-df", "https://www.w3schools.com/python/pandas/pandas_dataframes.asp"),
    ("python-data-science-3-pandas", "w3schools-pandas-csv", "https://www.w3schools.com/python/pandas/pandas_csv.asp"),
    ("python-data-science-3-pandas", "w3schools-pandas-clean", "https://www.w3schools.com/python/pandas/pandas_cleaning.asp"),
    ("python-data-science-3-pandas", "geeksforgeeks-pandas", "https://www.geeksforgeeks.org/python-pandas-dataframe/"),

    ("python-data-science-4-machine-learning", "w3schools-ml-intro", "https://www.w3schools.com/python/python_ml_getting_started.asp"),
    ("python-data-science-4-machine-learning", "w3schools-ml-regression", "https://www.w3schools.com/python/python_ml_linear_regression.asp"),
    ("python-data-science-4-machine-learning", "w3schools-ml-train", "https://www.w3schools.com/python/python_ml_train_test.asp"),
    ("python-data-science-4-machine-learning", "w3schools-ml-decision-tree", "https://www.w3schools.com/python/python_ml_decision_tree.asp"),
    ("python-data-science-4-machine-learning", "tutorialspoint-ml", "https://www.tutorialspoint.com/machine_learning/index.htm"),
    ("python-data-science-4-machine-learning", "geeksforgeeks-ml", "https://www.geeksforgeeks.org/machine-learning/"),

    ("python-data-science-5-neural-networks", "tutorialspoint-keras", "https://www.tutorialspoint.com/keras/index.htm"),
    ("python-data-science-5-neural-networks", "geeksforgeeks-nn-intro", "https://www.geeksforgeeks.org/introduction-to-neural-networks/"),
    ("python-data-science-5-neural-networks", "geeksforgeeks-nn-python", "https://www.geeksforgeeks.org/deep-learning-with-python/"),

    # Frontend HTML
    ("frontend-html", "w3schools-html-intro", "https://www.w3schools.com/html/html_intro.asp"),
    ("frontend-html", "w3schools-html-headings", "https://www.w3schools.com/html/html_headings.asp"),
    ("frontend-html", "w3schools-html-paragraphs", "https://www.w3schools.com/html/html_paragraphs.asp"),
    ("frontend-html", "w3schools-html-links", "https://www.w3schools.com/html/html_links.asp"),
    ("frontend-html", "w3schools-html-images", "https://www.w3schools.com/html/html_images.asp"),
    ("frontend-html", "w3schools-html-tables", "https://www.w3schools.com/html/html_tables.asp"),
    ("frontend-html", "w3schools-html-forms", "https://www.w3schools.com/html/html_forms.asp"),
    ("frontend-html", "tutorialspoint-html", "https://www.tutorialspoint.com/html/index.htm"),

    # Frontend CSS
    ("frontend-css", "w3schools-css-intro", "https://www.w3schools.com/css/css_intro.asp"),
    ("frontend-css", "w3schools-css-syntax", "https://www.w3schools.com/css/css_syntax.asp"),
    ("frontend-css", "w3schools-css-selectors", "https://www.w3schools.com/css/css_selectors.asp"),
    ("frontend-css", "w3schools-css-boxmodel", "https://www.w3schools.com/css/css_boxmodel.asp"),
    ("frontend-css", "w3schools-css-flexbox", "https://www.w3schools.com/css/css3_flexbox.asp"),
    ("frontend-css", "w3schools-css-grid", "https://www.w3schools.com/css/css_grid.asp"),
    ("frontend-css", "tutorialspoint-css", "https://www.tutorialspoint.com/css/index.htm"),

    # JavaScript ES2015+
    ("javascript-es-2015", "w3schools-js-letconst", "https://www.w3schools.com/js/js_let.asp"),
    ("javascript-es-2015", "w3schools-js-const", "https://www.w3schools.com/js/js_const.asp"),
    ("javascript-es-2015", "w3schools-js-arrow", "https://www.w3schools.com/js/js_arrow_function.asp"),
    ("javascript-es-2015", "w3schools-js-destructuring", "https://www.w3schools.com/js/js_destructuring.asp"),
    ("javascript-es-2015", "w3schools-js-modules", "https://www.w3schools.com/js/js_modules.asp"),
    ("javascript-es-2015", "w3schools-js-promises", "https://www.w3schools.com/js/js_promise.asp"),
    ("javascript-es-2015", "tutorialspoint-es6", "https://www.tutorialspoint.com/es6/index.htm"),
    ("javascript-es-2015", "geeksforgeeks-es6", "https://www.geeksforgeeks.org/introduction-to-es6/"),

    # JavaScript Async & Network
    ("javascript-async-and-network-requests", "w3schools-js-async", "https://www.w3schools.com/js/js_async.asp"),
    ("javascript-async-and-network-requests", "w3schools-js-callbacks", "https://www.w3schools.com/js/js_callback.asp"),
    ("javascript-async-and-network-requests", "w3schools-js-async-await", "https://www.w3schools.com/js/js_async_await.asp"),
    ("javascript-async-and-network-requests", "w3schools-js-fetch", "https://www.w3schools.com/js/js_api_fetch.asp"),
    ("javascript-async-and-network-requests", "tutorialspoint-ajax", "https://www.tutorialspoint.com/ajax/index.htm"),

    # JavaScript Testing
    ("javascript-testing", "geeksforgeeks-jest", "https://www.geeksforgeeks.org/jest-introduction/"),
    ("javascript-testing", "geeksforgeeks-js-testing", "https://www.geeksforgeeks.org/javascript-testing-methods/"),

    # React
    ("react", "w3schools-react-intro", "https://www.w3schools.com/react/react_intro.asp"),
    ("react", "w3schools-react-jsx", "https://www.w3schools.com/react/react_jsx.asp"),
    ("react", "w3schools-react-components", "https://www.w3schools.com/react/react_components.asp"),
    ("react", "w3schools-react-props", "https://www.w3schools.com/react/react_props.asp"),
    ("react", "w3schools-react-state", "https://www.w3schools.com/react/react_state.asp"),
    ("react", "w3schools-react-hooks", "https://www.w3schools.com/react/react_hooks.asp"),
    ("react", "w3schools-react-events", "https://www.w3schools.com/react/react_events.asp"),
    ("react", "tutorialspoint-react", "https://www.tutorialspoint.com/reactjs/index.htm"),

    # React Advanced
    ("react-advanced", "geeksforgeeks-react-context", "https://www.geeksforgeeks.org/react-js-context-api/"),
    ("react-advanced", "geeksforgeeks-react-hooks", "https://www.geeksforgeeks.org/react-hooks/"),
    ("react-advanced", "geeksforgeeks-react-perf", "https://www.geeksforgeeks.org/performance-optimization-in-react/"),

    # React Redux
    ("react-redux", "geeksforgeeks-redux-intro", "https://www.geeksforgeeks.org/introduction-to-redux/"),
    ("react-redux", "geeksforgeeks-react-redux", "https://www.geeksforgeeks.org/react-redux-introduction/"),

    # TypeScript
    ("typescript", "w3schools-ts-intro", "https://www.w3schools.com/typescript/typescript_intro.php"),
    ("typescript", "w3schools-ts-types", "https://www.w3schools.com/typescript/typescript_types.php"),
    ("typescript", "w3schools-ts-interfaces", "https://www.w3schools.com/typescript/typescript_interfaces.php"),
    ("typescript", "w3schools-ts-generics", "https://www.w3schools.com/typescript/typescript_generics.php"),
    ("typescript", "tutorialspoint-typescript", "https://www.tutorialspoint.com/typescript/index.htm"),

    # Node.js & npm
    ("node-and-npm", "w3schools-nodejs-intro", "https://www.w3schools.com/nodejs/nodejs_intro.asp"),
    ("node-and-npm", "w3schools-nodejs-modules", "https://www.w3schools.com/nodejs/nodejs_modules.asp"),
    ("node-and-npm", "w3schools-nodejs-http", "https://www.w3schools.com/nodejs/nodejs_http.asp"),
    ("node-and-npm", "w3schools-nodejs-files", "https://www.w3schools.com/nodejs/nodejs_filesystem.asp"),
    ("node-and-npm", "w3schools-nodejs-npm", "https://www.w3schools.com/nodejs/nodejs_npm.asp"),
    ("node-and-npm", "w3schools-nodejs-express", "https://www.w3schools.com/nodejs/nodejs_express.asp"),
    ("node-and-npm", "tutorialspoint-nodejs", "https://www.tutorialspoint.com/nodejs/index.htm"),

    # HTTP
    ("http", "tutorialspoint-http", "https://www.tutorialspoint.com/http/index.htm"),
    ("http", "geeksforgeeks-http", "https://www.geeksforgeeks.org/http-full-form/"),

    # Git
    ("git", "w3schools-git-intro", "https://www.w3schools.com/git/git_intro.asp?remote=github"),
    ("git", "w3schools-git-branch", "https://www.w3schools.com/git/git_branch.asp?remote=github"),
    ("git", "w3schools-git-merge", "https://www.w3schools.com/git/git_merge.asp?remote=github"),
    ("git", "tutorialspoint-git", "https://www.tutorialspoint.com/git/index.htm"),

    # Databases
    ("databases-datastore", "w3schools-sql-intro", "https://www.w3schools.com/sql/sql_intro.asp"),
    ("databases-datastore", "w3schools-sql-select", "https://www.w3schools.com/sql/sql_select.asp"),
    ("databases-datastore", "w3schools-sql-join", "https://www.w3schools.com/sql/sql_join.asp"),
    ("databases-datastore", "w3schools-sql-groupby", "https://www.w3schools.com/sql/sql_groupby.asp"),
    ("databases-datastore", "tutorialspoint-sql", "https://www.tutorialspoint.com/sql/index.htm"),
    ("databases-datastore", "geeksforgeeks-sql", "https://www.geeksforgeeks.org/sql-tutorial/"),

    # Terminal Basics
    ("terminal-basics", "tutorialspoint-unix", "https://www.tutorialspoint.com/unix/index.htm"),
    ("terminal-basics", "geeksforgeeks-linux-intro", "https://www.geeksforgeeks.org/introduction-to-linux-operating-system/"),
    ("terminal-basics", "geeksforgeeks-linux-commands", "https://www.geeksforgeeks.org/basic-linux-commands/"),
]

async def main():
    tasks = [save_course(cid, section, url) for cid, section, url in SOURCES]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    ok = sum(1 for r in results if r is None)
    err = sum(1 for r in results if isinstance(r, Exception))
    print(f"\nDone! {ok} OK, {err} errors")

if __name__ == "__main__":
    asyncio.run(main())
