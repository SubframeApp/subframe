#!/bin/bash

# Output header
cat << 'EOF'
# Subframe Documentation Outline

**Total Articles:** 56
**Generated:** 2025-11-14
**Order:** Matches docs.json navigation structure

This outline shows the complete documentation structure with:
- Title as H1 for each article
- Description and URL path
- Full heading hierarchy (H2 and H3)

---

EOF

# Function to process a single file
process_file() {
    local path="$1"
    local file="${path}.mdx"
    
    if [[ ! -f "$file" ]]; then
        return
    fi
    
    # Get frontmatter
    local title=$(head -10 "$file" | grep "^title:" | sed 's/title: //')
    local description=$(head -10 "$file" | grep "^description:" | sed 's/description: //')
    
    # Print article header
    echo "# $title"
    echo ""
    echo "**Description:** $description"
    echo "**URL:** /${path}"
    echo ""
    
    # Print headings
    grep "^##" "$file" | grep -v "^##\s*$"
    echo ""
}

# Process in docs.json order
cd /Users/filip/Projects/subframe/packages/docs

# Get started
process_file "get-started/introduction"
process_file "get-started/quickstart"
process_file "get-started/concepts"
process_file "get-started/faq"

# Installation
process_file "installation/new-project"
process_file "installation/existing-project"
process_file "installation/framework-guides/nextjs"
process_file "installation/framework-guides/vite"
process_file "installation/framework-guides/astro"
process_file "installation/framework-guides/monorepo"
process_file "installation/framework-guides/manual"

# Develop with Subframe
process_file "developing/mcp-server"
process_file "developing/syncing-components"
process_file "developing/exporting-code"
process_file "developing/adding-business-logic"
process_file "developing/tailwind-config"
process_file "developing/auth-tokens"
process_file "developing/disabling-sync"

# Theme
process_file "theme/overview"
process_file "theme/customizing-theme"
process_file "theme/importing-tokens"
process_file "theme/dark-mode"

# Components
process_file "components/overview"
process_file "components/creating-components"
process_file "components/using-components"
process_file "components/props-and-slots"

# Editor
process_file "editor/overview"
process_file "editor/ask-ai/prompt-to-design"
process_file "editor/ask-ai/image-to-design"
process_file "editor/ask-ai/inline-ask-ai"
process_file "editor/ask-ai/remix-pages"
process_file "editor/ask-ai/personalizing-ai"
process_file "editor/design-mode/page-editor"
process_file "editor/design-mode/add-elements"
process_file "editor/design-mode/layers"
process_file "editor/design-mode/inspector"
process_file "editor/design-mode/responsive-design"
process_file "editor/design-mode/page-layouts"
process_file "editor/design-mode/preview"
process_file "editor/design-mode/actions-menu"
process_file "editor/design-mode/custom-css"
process_file "editor/prototype-mode/overview"
process_file "editor/prototype-mode/annotations"
process_file "editor/prototype-mode/chat-with-ai"
process_file "editor/prototype-mode/updating-designs"
process_file "editor/prototype-mode/view-prototype-code"
process_file "editor/prototype-mode/sharing-prototypes"
process_file "editor/code-mode/inspecting-code"
process_file "editor/code-mode/export-preferences"
process_file "editor/code-mode/export-prompts"

# Admin and billing
process_file "admin/inviting-team-members"
process_file "admin/roles-and-permissions"
process_file "admin/pricing-and-plans"
process_file "admin/managing-projects"
process_file "admin/auth-tokens"
process_file "admin/sso/okta"
