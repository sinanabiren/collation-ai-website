#!/bin/bash

# Script to migrate React Router pages to Next.js App Router
SOURCE_DIR="/tmp/link-gather-flow/src/pages"
TARGET_DIR="/Users/sinanbiren/Documents/websiteclone/app"

echo "Starting migration of pages from link-gather-flow..."

# Copy all pages
for file in "$SOURCE_DIR"/*.tsx; do
  filename=$(basename "$file")
  pagename="${filename%.tsx}"

  # Skip if it's Index.tsx (we already have a homepage)
  if [ "$pagename" = "Index" ]; then
    echo "Skipping Index.tsx (already have homepage)"
    continue
  fi

  # Skip NotFound (Next.js handles this)
  if [ "$pagename" = "NotFound" ]; then
    echo "Skipping NotFound.tsx (Next.js handles 404)"
    continue
  fi

  # Convert to kebab-case for Next.js routing
  route=$(echo "$pagename" | sed 's/\([A-Z]\)/-\L\1/g' | sed 's/^-//')

  echo "Migrating $pagename to /$route..."

  # Create directory for the route
  mkdir -p "$TARGET_DIR/$route"

  # Copy the file as page.tsx
  cp "$file" "$TARGET_DIR/$route/page.tsx"

  # Add 'use client' directive at the top if not present
  if ! grep -q "use client" "$TARGET_DIR/$route/page.tsx"; then
    echo -e "'use client'\n\n$(cat $TARGET_DIR/$route/page.tsx)" > "$TARGET_DIR/$route/page.tsx"
  fi

  # Replace React Router imports with Next.js
  sed -i '' 's/import { Link, useNavigate } from "react-router-dom"/import Link from "next\/link"\nimport { useRouter } from "next\/navigation"/g' "$TARGET_DIR/$route/page.tsx"
  sed -i '' 's/import { useNavigate } from "react-router-dom"/import { useRouter } from "next\/navigation"/g' "$TARGET_DIR/$route/page.tsx"
  sed -i '' 's/import { Link } from "react-router-dom"/import Link from "next\/link"/g' "$TARGET_DIR/$route/page.tsx"

  # Replace useNavigate with useRouter
  sed -i '' 's/const navigate = useNavigate()/const router = useRouter()/g' "$TARGET_DIR/$route/page.tsx"
  sed -i '' 's/navigate(/router.push(/g' "$TARGET_DIR/$route/page.tsx"

  # Convert <Link to="/path"> to <Link href="/path">
  sed -i '' 's/<Link to="/<Link href="/g' "$TARGET_DIR/$route/page.tsx"

  # Export as default
  sed -i '' "s/const $pagename = /export default function ${pagename}Page/g" "$TARGET_DIR/$route/page.tsx"
  sed -i '' "/export default $pagename/d" "$TARGET_DIR/$route/page.tsx"
done

echo "Migration complete! Migrated $(ls -1 $TARGET_DIR | wc -l) pages."
