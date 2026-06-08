"""Migrate courses from Programming-Slides submodule to skills/courses/ knowledge base."""
import json
import os
import shutil
import glob as glob_mod

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COURSE_DATA = os.path.join(BASE, "static", "data", "course-data.json")
SLIDES_SRC = os.path.join(BASE, "dependencies", "Programming-Slides", "sections")
SKILLS_DIR = os.path.join(BASE, "skills", "courses")

with open(COURSE_DATA, "r", encoding="utf-8") as f:
    all_courses = json.load(f)["courses"]

grouped = {}
for c in all_courses:
    cid = c["id"]
    if cid not in grouped:
        grouped[cid] = {"id": cid, "category": c.get("category", "General"), "icon": c.get("icon", "fas fa-book"), "langs": {}}
    grouped[cid]["langs"][c["lang"]] = {
        "title": c["title"],
        "description": c.get("description", ""),
        "sections": c.get("sections", []),
    }

os.makedirs(SKILLS_DIR, exist_ok=True)

CATEGORY_DESCRIPTIONS = {
    "Python": "Python is a versatile, high-level programming language known for its readability and extensive ecosystem.",
    "JavaScript": "JavaScript is the language of the web, powering interactive frontends and scalable backends alike.",
    "React": "React is a declarative, component-based library for building modern user interfaces.",
    "TypeScript": "TypeScript adds static typing to JavaScript, catching errors at compile time.",
    "Frontend": "Frontend development focuses on the visual and interactive aspects of web applications.",
    "Node.js": "Node.js enables JavaScript to run on the server, powering fast, event-driven backends.",
    "Tools": "Developer tools like Git and the terminal form the foundation of efficient software workflows.",
    "Databases": "Databases store, query, and manage data — the backbone of most applications.",
    "Web": "Web technologies and protocols define how browsers and servers communicate.",
}

AGENT_INSTRUCTIONS = """You are an expert instructor specializing in **{title}**. Your role is to:

1. Generate accurate, beginner-friendly course content
2. Provide clear code examples and practical exercises
3. Answer student questions with depth and patience
4. Use the knowledge base markdown files as your source of truth
5. Adapt explanations to the student's level (beginner → advanced)

## Knowledge Base
Your knowledge base is located at `skills/courses/{course_id}/knowledge/`. These files contain
the authoritative course content. When teaching:

- Reference the relevant knowledge files for each section
- Generate live code examples that illustrate concepts
- Suggest exercises that reinforce learning
- Connect concepts to real-world applications

## Teaching Approach
- Start with "why" before "how"
- Use analogies for complex concepts
- Encourage hands-on experimentation
- Provide incremental complexity
"""

def generate_skill_md(course_id, title, category, description):
    cat_desc = CATEGORY_DESCRIPTIONS.get(category, f"{category} concepts and best practices.")
    return f"""# {title}

## Domain
{description}

## Category
{category}

## Knowledge Domain
{cat_desc}

## Agent Instructions

{AGENT_INSTRUCTIONS.format(course_id=course_id, title=title)}

## Related Skills
"""


for cid, cdata in grouped.items():
    course_dir = os.path.join(SKILLS_DIR, cid)
    knowledge_dir = os.path.join(course_dir, "knowledge")
    os.makedirs(knowledge_dir, exist_ok=True)

    primary_lang = list(cdata["langs"].keys())[0]
    primary = cdata["langs"][primary_lang]

    skill_md = generate_skill_md(cid, primary["title"], cdata["category"], primary["description"])
    with open(os.path.join(course_dir, "SKILL.md"), "w", encoding="utf-8") as f:
        f.write(skill_md)

    course_json = {"id": cid, "category": cdata["category"], "icon": cdata["icon"], "langs": cdata["langs"]}
    with open(os.path.join(course_dir, "course.json"), "w", encoding="utf-8") as f:
        json.dump(course_json, f, indent=2, ensure_ascii=False)

    src_dir = os.path.join(SLIDES_SRC, cid)
    if os.path.isdir(src_dir):
        for fname in os.listdir(src_dir):
            if fname.endswith(".md"):
                shutil.copy2(os.path.join(src_dir, fname), os.path.join(knowledge_dir, fname))
        print(f"  Copied {len(os.listdir(src_dir))} files for {cid}")
    else:
        print(f"  WARNING: No source directory for {cid}")

print(f"\nDone! {len(grouped)} courses migrated to {SKILLS_DIR}")
