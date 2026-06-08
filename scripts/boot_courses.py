#!/usr/bin/env python3
"""
Custodian AI Course System — Boot & Sync Script
    
Creates the complete course infrastructure from scratch:
  courses/          → Course content (course.json + knowledge/)
  skills/courses/   → Agent skill definitions (SKILL.md only)
  ~/.agents/skills/courses/        → Copied skills for opencode agents
  ~/.config/opencode/skills/courses/ → Copied skills for opencode
    
Usage:
  python scripts/boot_courses.py          # Full setup
  python scripts/boot_courses.py --sync   # Re-sync skills only
  python scripts/boot_courses.py --status # Show current state
"""
import argparse
import json
import os
import shutil
import sys
from pathlib import Path

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent

COURSES_DIR = BASE_DIR / "courses"
SKILLS_DIR = BASE_DIR / "skills" / "courses"

AGENT_SKILL_DIR = Path.home() / ".agents" / "skills" / "courses"
OPENCODE_SKILL_DIR = Path.home() / ".config" / "opencode" / "skills" / "courses"

SYNC_TARGETS = [AGENT_SKILL_DIR, OPENCODE_SKILL_DIR]


def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)


def status():
    print("═" * 50)
    print("Course System Status")
    print("═" * 50)

    for label, path in [
        ("Courses (content)", COURSES_DIR),
        ("Skills (definitions)", SKILLS_DIR),
    ]:
        if path.is_dir():
            dirs = [d.name for d in path.iterdir() if d.is_dir()]
            total = len(dirs)
            print(f"\n  {label}: {total} courses")
            if total <= 10:
                for d in sorted(dirs):
                    print(f"    • {d}")
            else:
                for d in sorted(dirs)[:5]:
                    print(f"    • {d}")
                print(f"    … and {total - 5} more")
        else:
            print(f"\n  {label}: NOT FOUND")

    for target in SYNC_TARGETS:
        label = f"  Skills (synced → {target})"
        if target.is_dir():
            count = len([d for d in target.iterdir() if d.is_dir()])
            print(f"\n{label}: {count} course skills")
        else:
            print(f"\n{label}: NOT SYNCED")


def build_courses():
    """Create courses/ with course.json + knowledge for each course."""
    print("Building courses/ …")

    existing = [d.name for d in SKILLS_DIR.iterdir() if d.is_dir()]
    # If courses/ is already populated from a prior run, skip rebuild
    if COURSES_DIR.is_dir() and any(COURSES_DIR.iterdir()):
        print("  courses/ already exists — skipping rebuild")
        return

    ensure_dir(COURSES_DIR)
    built = 0
    for cid in sorted(existing):
        src_skill = SKILLS_DIR / cid / "SKILL.md"
        # We need the course.json — if skills already has it, great
        src_json = SKILLS_DIR / cid / "course.json"
        src_knowledge = SKILLS_DIR / cid / "knowledge"

        dest = COURSES_DIR / cid
        ensure_dir(dest)

        if src_json.is_file():
            shutil.copy2(src_json, dest / "course.json")

        if src_knowledge.is_dir():
            shutil.copytree(src_knowledge, dest / "knowledge", dirs_exist_ok=True)

        built += 1
        print(f"  ✓ {cid}")

    print(f"  Done — {built} courses in courses/")


def build_skills():
    """Ensure each course has a SKILL.md in skills/courses/."""
    print("Building skills/courses/ …")
    ensure_dir(SKILLS_DIR)

    course_data_dir = COURSES_DIR if COURSES_DIR.is_dir() else SKILLS_DIR
    source_dirs = [d for d in course_data_dir.iterdir() if d.is_dir()]

    written = 0
    for cdir in sorted(source_dirs):
        cid = cdir.name
        skill_path = SKILLS_DIR / cid / "SKILL.md"
        if skill_path.is_file():
            written += 1
            continue

        # Generate a basic SKILL.md if none exists
        json_path = cdir / "course.json"
        title = cid
        description = ""
        category = "General"
        if json_path.is_file():
            with open(json_path) as f:
                data = json.load(f)
            langs = data.get("langs", {})
            en = langs.get("en", {})
            title = en.get("title", cid)
            description = en.get("description", data.get("description", ""))
            category = data.get("category", "General")

        skill_content = f"""# {title}

## Domain
{description or f"Master {title} with hands-on tutorials and examples."}

## Category
{category}

## Agent Instructions
You are an expert instructor specializing in **{title}**. Your role is to:

1. Generate accurate, beginner-friendly course content
2. Provide clear code examples and practical exercises
3. Answer student questions with depth and patience
4. Use the knowledge base markdown files as your source of truth
5. Adapt explanations to the student's level (beginner → advanced)

## Knowledge Base
Located at `courses/{cid}/knowledge/`. Reference these files when teaching.

## Teaching Approach
- Start with "why" before "how"
- Use analogies for complex concepts
- Encourage hands-on experimentation
- Provide incremental complexity
"""
        ensure_dir(SKILLS_DIR / cid)
        with open(skill_path, "w") as f:
            f.write(skill_content)
        written += 1
        print(f"  ✓ {cid} (generated SKILL.md)")

    print(f"  Done — {written} course skills in skills/courses/")


def sync_skills():
    """Copy SKILL.md files from skills/courses/ to agent & opencode dirs."""
    print("Syncing course skills to agent directories …")

    if not SKILLS_DIR.is_dir():
        print("  ERROR: skills/courses/ not found — run build first")
        return

    total = 0
    for target_dir in SYNC_TARGETS:
        ensure_dir(target_dir)
        copied = 0
        for cdir in sorted(SKILLS_DIR.iterdir()):
            if not cdir.is_dir():
                continue
            src = cdir / "SKILL.md"
            if not src.is_file():
                continue
            dst_dir = target_dir / cdir.name
            ensure_dir(dst_dir)
            shutil.copy2(src, dst_dir / "SKILL.md")
            copied += 1
        total += copied
        print(f"  ✓ {len(os.listdir(target_dir.as_posix()))} skills → {target_dir}")

    print(f"  Done — synced to {len(SYNC_TARGETS)} locations")


def teardown():
    """Remove all course data (for clean rebuild)."""
    for path in [COURSES_DIR]:
        if path.is_dir():
            shutil.rmtree(path)
            print(f"  Removed {path}")
    print("  Teardown complete")


def main():
    parser = argparse.ArgumentParser(description="Custodian AI Course Boot & Sync")
    parser.add_argument("--sync", action="store_true", help="Re-sync skills only")
    parser.add_argument("--status", action="store_true", help="Show current state")
    parser.add_argument("--teardown", action="store_true", help="Remove all course data")

    args = parser.parse_args()

    if args.status:
        status()
        return

    if args.teardown:
        teardown()
        return

    if args.sync:
        sync_skills()
        return

    # Full boot sequence
    print("\n═══ Custodian AI Course Boot ═══\n")
    build_courses()
    build_skills()
    sync_skills()
    print("\n═══ Boot complete ═══\n")
    status()


if __name__ == "__main__":
    main()
