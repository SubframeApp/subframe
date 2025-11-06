#!/bin/bash

# Script to migrate React.forwardRef to the new forwardRef utility

# Find all .tsx and .ts files in src directory that use React.forwardRef
# Exclude the forward-ref.ts file itself and node_modules
files=$(grep -rl "React\.forwardRef" /home/user/subframe/packages/subframe-core/src \
  --include="*.tsx" \
  --include="*.ts" \
  --exclude="forward-ref.ts" \
  | grep -v node_modules)

echo "Found $(echo "$files" | wc -l) files to migrate"

for file in $files; do
  echo "Processing: $file"

  # Check if file already imports forwardRef from our utility
  if grep -q 'from.*["'\''].*lib/forward-ref["'\'']' "$file"; then
    echo "  Already migrated, skipping..."
    continue
  fi

  # Determine the relative path to lib/forward-ref
  # Count directory depth from src/
  depth=$(echo "$file" | sed 's|/home/user/subframe/packages/subframe-core/src/||' | tr -cd '/' | wc -c)
  if [ $depth -eq 0 ]; then
    rel_path="./lib/forward-ref"
  elif [ $depth -eq 1 ]; then
    rel_path="../lib/forward-ref"
  elif [ $depth -eq 2 ]; then
    rel_path="../../lib/forward-ref"
  elif [ $depth -eq 3 ]; then
    rel_path="../../../lib/forward-ref"
  else
    rel_path="../../../../lib/forward-ref"
  fi

  # Create a temporary file
  temp_file="${file}.tmp"

  # Check if there's already an import from "react"
  if grep -q '^import.*from ["\']react["\']' "$file"; then
    # Add forwardRef import after the React import
    sed '/^import.*from ["\x27]react["\x27]/a\
import { forwardRef } from "'"$rel_path"'"' "$file" > "$temp_file"
  else
    # Add forwardRef import at the beginning, after "use client" if present
    if grep -q '^"use client"' "$file"; then
      sed '/"use client"/a\
\
import { forwardRef } from "'"$rel_path"'"' "$file" > "$temp_file"
    else
      # Add at the beginning
      echo 'import { forwardRef } from "'"$rel_path"'"' | cat - "$file" > "$temp_file"
    fi
  fi

  # Replace React.forwardRef with forwardRef in the temp file
  sed -i 's/React\.forwardRef/forwardRef/g' "$temp_file"

  # Move temp file to original
  mv "$temp_file" "$file"

  echo "  ✓ Migrated"
done

echo "Migration complete!"
