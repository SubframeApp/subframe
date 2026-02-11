---
name: design
description: Design UI pages in Subframe. Use when building new UI, iterating on existing UI, exploring design options, or to get a visual starting point to refine in the Subframe design tool. Don't write UI code directly - design first, then implement with /subframe:develop.
argument-hint: "[description of what to design]"
---

Design pages using the `design_page` and `edit_page` MCP tools. `design_page` creates AI-generated design variations that the user can preview and select. `edit_page` applies direct code edits to an existing Subframe page. Both produce designs the user can refine visually in the Subframe editor and then implement in code.

**Don't write UI code directly.** Subframe generates production-ready React/Tailwind code that matches the design system. Design first, then implement with `/subframe:develop`.

## When to Use This

Use `/subframe:design` when the user:

- **Needs UI while coding**
- **Wants to explore design options**
- **Has codebase context that should inform the design**
- **Wants a starting point to refine in a design tool**
- **Is collaborating on designs with a team**
- **Wants to modify an existing page**

The key value: `/subframe:design` and `/subframe:develop` bridge coding and design. They work in both directions — create designs while coding and then ensure your code exactly reflects your design.

## MCP Authentication

If you cannot find the `design_page` tool (or any Subframe MCP tools), the MCP server likely needs to be authenticated. Ask the user to authenticate the Subframe MCP server. If the user is using Claude Code, instruct them to run `/mcp` to view and authenticate their MCP servers, and then say "done" when they're finished.

## Subframe Basics

- **Components** (buttons, inputs, cards): Synced via CLI. Source of truth in Subframe. Don't modify locally.
- **Pages** (screens): Designed via AI or editor. Exported via MCP. Add business logic after export.

Subframe knows about the design system and theme. Your job is to provide context from the user's codebase.

## Workflow

You do not have to run `/subframe:setup` before designing. The `design_page` MCP tool works independently — it only needs a `projectId` and an authenticated MCP server. Local project setup (`.subframe/` folder, synced components, Tailwind config) is not required to design pages.

1. **Understand the request** — If vague, ask clarifying questions. What data? What actions? Who uses it?
2. **Find the projectId** — Check `.subframe/sync.json` if it exists. If there is no `.subframe/sync.json` or no projectId found, ask the user to go to `https://app.subframe.com/cli/auth` to get a project ID.
3. **Decide: `design_page` or `edit_page`?** Then call the respective MCP tool:
   - **`design_page`** → Creating something new, exploring multiple directions, or redesigning existing UI where the user wants options to choose from
   - **`edit_page`** → Making targeted changes to a Subframe page that was just created in this session (via `design_page`) or that the user provided via an MCP link
4. **Present the review URL** — This is the primary output. The user will preview and choose next steps.

## `design_page` — New Pages & Redesigns

Use `design_page` when:

- Creating a new page from scratch
- Redesigning or rethinking existing UI — even if there's an existing implementation in code, use `design_page` when the user wants to explore multiple design directions or start fresh
- The user wants options to choose from (multiple variations)

### Context and Variations

How much context to gather and how many variations to generate depends on the task:

| Task                           | Context                                                           | Variations                           |
| ------------------------------ | ----------------------------------------------------------------- | ------------------------------------ |
| **New page (open-ended)**      | Data types (`codeContext`)                                        | 4 — explore the design space         |
| **New page (with reference pages)** | Reference pages (`additionalPages` if in Subframe, `codeContext` if not), data types (`codeContext`) | 1-2 — stay close to the reference pages |
| **Redesigning existing UI**    | The current page (`additionalPages` if in Subframe, `codeContext` if not; note what to keep vs change in the description) | 2-4 — depending on how open-ended    |

**Always include when available:**

- Similar existing pages (the single most valuable context). Use `additionalPages` for Subframe pages — pass the `pageId` returned by `design_page`, or the page ID from a pasted MCP link. Use `codeContext` for pages that only exist in the codebase.
- Components or patterns the user refers to or explicitly mentions (via `codeContext`)
- Data types/interfaces for what the page will display (via `codeContext`)

### Variations

Each variation is a prompt that drives a unique design direction.

**When you have reference pages** (`additionalPages`), use fewer variations (1-2) and keep them grounded in the reference. The variations should refine or extend the existing design, not diverge from it. For example:
- "Follow the same layout as the reference page but adapted for [new content]"
- "Same structure with a more compact data-dense layout"

**When starting from scratch** (no `additionalPages`), use more variations (4) to explore the design space:
- "Compact data table with inline actions and bulk operations"
- "Card-based layout with visual hierarchy and quick filters"
- "Minimal single-column design focused on the primary action"
- "Split-panel layout with sidebar navigation and detail view"

More variations = more exploration. Fewer = more focused. Default to fewer when strong context exists.

### Multi-Page Requests

When designing multiple related pages (flows, CRUD, etc.):

1. Design the primary page first with more variations to establish the direction
2. After user selects a variation, design remaining pages passing the relevant pages via `additionalPages` as context
3. Use the same `flowName` to group related pages together

## `edit_page` — Editing a Subframe Page with Code

Use `edit_page` when making targeted edits to a specific Subframe page by providing updated TSX code directly.

### Code Rules

Subframe pages are static TSX that gets parsed back into Subframe's visual model. The code you provide must follow these rules:

- **Raw TSX only** — No import statements, no function definitions, no export statements. Just the JSX body starting from the root element (e.g. `<DefaultPageLayout>` or `<div>`). Note: `get_page_info` returns the full file with imports — you must strip those and only send the JSX body to `edit_page`.
- **No business logic** — No `useState`, hooks, API calls, event handlers, or any dynamic behavior. Pages are purely visual; business logic is added after export.
- **No loops or dynamic code** — No `.map()`, `.forEach()`, `.filter()`, or any iteration. Every element must be written out explicitly.
- **Match the existing code style exactly** — Preserve how flex, gap, padding, and other layout properties are structured. The code will be parsed back into the Subframe editor, so the structure matters.
- **Tailwind classes only** — No `style` attribute. Use `className` with Tailwind classes for all styling. If you need a custom value, use Tailwind's bracket syntax (e.g. `bg-[#ff0000]`).
- **Only use components from the Subframe project and standard HTML tags** — Use `list_components` or `get_component_info` to see what's available. Allowed HTML tags: `div`, `span`, `img`, `p`, `h1`-`h6`, `nav`, `header`, `main`, `article`, `section`, `aside`, `footer`. Don't use arbitrary React components or HTML elements beyond these.
- **No nested text elements** — Text tags (`span`, `p`, `h1`-`h6`) can only contain plain text strings, not other elements.
- **No omitted code or placeholders** — Output the complete page code. No `// ...rest of code...` or `{/* TODO */}` comments.
- **Preserve `data-subframe-node-id` attributes** — Never change or remove these IDs; they're critical for the Subframe editor.

### Workflow

1. **Get the current code** — Call `get_page_info` to get the page's current TSX code. **Always refetch immediately before editing** — do not reuse code from earlier in the conversation, as the page may have been modified in the Subframe editor.
2. **Modify the code** — Make the desired changes following the code rules above
3. **Call `edit_page`** with:
   - **Page identifier**: `id`, `name`, or `url` — same as `get_page_info`. Use `list_pages` to find existing pages if needed.
   - **`code`**: The full updated TSX code for the page
   - **`description`**: A short description of what changed (shown in the AI tab)
4. **If the code fails to parse** — Fix the errors based on the error message and retry
5. **Present the `editUrl`** — The user opens the design editor with the AI tab open to review and apply the edit

### When to use `edit_page` vs `design_page`

- **`edit_page`**: You know exactly what code changes to make. You provide the updated TSX directly. Fast, precise, no AI generation.
- **`design_page`**: You want AI-generated design variations. The user picks a direction. Better for new pages or exploring options.

**When NOT to use `edit_page`:** If the user has existing UI in their codebase but no corresponding Subframe page, or if they want to explore multiple design options, use `design_page` instead. `edit_page` is for iterating on a known Subframe page with specific code changes.

## After Designing

For `design_page`, present the `reviewUrl` as a clickable markdown link. The user will:

1. **Preview variations** — See each design option rendered in Subframe
2. **Select a variation** — Choose the one that best fits their needs
3. **Open in editor** — Refine visually in Subframe's full design editor

From there, the user may continue refining in Subframe or return here and ask you to implement the design in code. Do NOT ask the user which variation they prefer or present variation options as a multiple choice in chat. Variation selection happens in the Subframe editor, not here. Simply present the review URL and let them know they can ask you to implement the design once they're ready.

For `edit_page`, present the `editUrl` as a clickable markdown link. The user opens the design editor with the AI tab showing the edit, where they can apply it or undo.

Internally track the `pageId` from the response — you'll need it for `/subframe:develop`, `additionalPages` for future designs, or `edit_page` for future edits — but don't mention it to the user.
