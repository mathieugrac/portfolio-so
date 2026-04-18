#!/usr/bin/env python3
"""Prepend new project slugs to projects-order.yml.

Compares slugs found in src/content/projects/*.md with slugs already listed
in src/content/settings/projects-order.yml. Any slug present on disk but
missing from the order file is prepended to the list.
"""

import re
import sys
from pathlib import Path
from typing import Optional

PROJECTS_DIR = Path("src/content/projects")
ORDER_FILE = Path("src/content/settings/projects-order.yml")

SLUG_RE = re.compile(r'^slug:\s*["\']?([^"\'\n]+?)["\']?\s*$', re.MULTILINE)
ORDER_ITEM_RE = re.compile(r'^\s*-\s*(.+?)\s*$', re.MULTILINE)
ORDER_HEADER_RE = re.compile(r'^(order:\s*\n)', re.MULTILINE)


def extract_slug(md_path: Path) -> Optional[str]:
    content = md_path.read_text(encoding="utf-8")
    match = SLUG_RE.search(content)
    return match.group(1).strip() if match else None


def main() -> int:
    if not ORDER_FILE.exists():
        print(f"Order file not found: {ORDER_FILE}", file=sys.stderr)
        return 1

    project_slugs = [
        slug
        for md in sorted(PROJECTS_DIR.glob("*.md"))
        if (slug := extract_slug(md))
    ]

    order_content = ORDER_FILE.read_text(encoding="utf-8")
    existing = set(ORDER_ITEM_RE.findall(order_content))

    new_slugs = [s for s in project_slugs if s not in existing]

    if not new_slugs:
        print("No new projects to add")
        return 0

    print(f"Prepending {len(new_slugs)} new project(s): {new_slugs}")

    new_entries = "\n".join(f"  - {s}" for s in new_slugs) + "\n"
    updated = ORDER_HEADER_RE.sub(
        lambda m: m.group(1) + new_entries, order_content, count=1
    )

    if updated == order_content:
        print("Could not find 'order:' header in file", file=sys.stderr)
        return 1

    ORDER_FILE.write_text(updated, encoding="utf-8")
    print("Order file updated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
