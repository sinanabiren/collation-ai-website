#!/usr/bin/env python3
"""
Migrate React Router pages from link-gather-flow to Next.js App Router
"""

import os
import re
import shutil
from pathlib import Path

SOURCE_DIR = Path("/tmp/link-gather-flow/src/pages")
TARGET_DIR = Path("/Users/sinanbiren/Documents/websiteclone/app")

def camel_to_kebab(name):
    """Convert CamelCase to kebab-case"""
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

def migrate_page(source_file):
    """Migrate a single page file"""
    filename = source_file.name
    pagename = filename.replace('.tsx', '')

    # Skip certain files
    if pagename in ['Index', 'NotFound']:
        print(f"Skipping {filename}")
        return

    # Convert to kebab-case for routing
    route = camel_to_kebab(pagename)
    print(f"Migrating {pagename} to /{route}...")

    # Create target directory
    target_route_dir = TARGET_DIR / route
    target_route_dir.mkdir(parents=True, exist_ok=True)

    # Read source content
    with open(source_file, 'r') as f:
        content = f.read()

    # Add 'use client' if not present
    if "'use client'" not in content and '"use client"' not in content:
        content = "'use client'\n\n" + content

    # Replace React Router imports with Next.js
    content = re.sub(
        r'import \{ Link, useNavigate \} from ["\']react-router-dom["\']',
        'import Link from "next/link"\nimport { useRouter } from "next/navigation"',
        content
    )
    content = re.sub(
        r'import \{ useNavigate \} from ["\']react-router-dom["\']',
        'import { useRouter } from "next/navigation"',
        content
    )
    content = re.sub(
        r'import \{ Link \} from ["\']react-router-dom["\']',
        'import Link from "next/link"',
        content
    )

    # Replace useNavigate with useRouter
    content = re.sub(r'const navigate = useNavigate\(\)', 'const router = useRouter()', content)
    content = re.sub(r'navigate\(', 'router.push(', content)

    # Convert <Link to="..." to <Link href="..."
    content = re.sub(r'<Link to=', '<Link href=', content)

    # Fix component export
    # Change: const ComponentName = () =>  to  export default function ComponentNamePage()
    content = re.sub(
        rf'const {pagename} = \(\) =>',
        f'export default function {pagename}Page() {{',
        content
    )

    # Remove standalone export default
    content = re.sub(rf'export default {pagename};?', '', content)

    # Close the function if we changed the declaration
    if f'export default function {pagename}Page()' in content:
        # Find the last closing brace and ensure it's there
        pass

    # Write to target
    target_file = target_route_dir / 'page.tsx'
    with open(target_file, 'w') as f:
        f.write(content)

def main():
    print("Starting migration of pages from link-gather-flow...\n")

    # Get all .tsx files
    tsx_files = list(SOURCE_DIR.glob('*.tsx'))

    for tsx_file in tsx_files:
        try:
            migrate_page(tsx_file)
        except Exception as e:
            print(f"Error migrating {tsx_file.name}: {e}")

    print(f"\nMigration complete! Check {TARGET_DIR}")

if __name__ == '__main__':
    main()
