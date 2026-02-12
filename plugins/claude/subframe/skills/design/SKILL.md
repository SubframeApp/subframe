---
name: design
description: Design UI pages in Subframe. Use when building new UI, iterating on existing UI, exploring design options, or to get a visual starting point to refine in the Subframe design tool. Don't write UI code directly - design first, then implement with /subframe:develop.
argument-hint: "[description of what to design]"
---

Design pages using the `design_page` and `edit_page` MCP tools. `design_page` creates AI-generated design variations that the user can preview and select. `edit_page` makes targeted changes to an existing Subframe page. Both produce designs the user can refine visually in the Subframe editor and then implement in code. Update the theme for the entire project using `edit_theme`.

**Don't write UI code directly.** Subframe generates production-ready React/Tailwind code that matches the design system. Design first, then implement with `/subframe:develop`.

## When to Use This

Use `/subframe:design` when the user:

- **Needs UI while coding**
- **Wants to explore design options**
- **Has codebase context that should inform the design**
- **Wants a starting point to refine in a design tool**
- **Is collaborating on designs with a team**
- **Wants to modify an existing page**
- **Wants to edit the theme for their Subframe designs**

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

## `edit_page` — Targeted Edits to an Existing Page

Use `edit_page` for targeted changes to a specific Subframe page. Provide a page identifier and a description of the changes — Subframe handles the rest.

- **`description`**: Describe what to change. You can include code snippets for precision, but it's not required.
- **Page identifier**: `id`, `name`, or `url`. Use `list_pages` to find existing pages if needed.

Present the returned `editUrl` to the user so they can review and apply the edit.

### When to use `edit_page` vs `design_page`

- **`edit_page`**: Targeted changes to an existing Subframe page. Fast and precise.
- **`design_page`**: New pages, redesigns, or exploring multiple design directions.

**When NOT to use `edit_page`:** If the user has existing UI in their codebase but no corresponding Subframe page, or if they want to explore multiple design options, use `design_page` instead.

## After Designing

For `design_page`, present the `reviewUrl` as a clickable markdown link. The user will:

1. **Preview variations** — See each design option rendered in Subframe
2. **Select a variation** — Choose the one that best fits their needs
3. **Open in editor** — Refine visually in Subframe's full design editor

From there, the user may continue refining in Subframe or return here and ask you to implement the design in code. Do NOT ask the user which variation they prefer or present variation options as a multiple choice in chat. Variation selection happens in the Subframe editor, not here. Simply present the review URL and let them know they can ask you to implement the design once they're ready.

For `edit_page`, present the `editUrl` as a clickable markdown link. The user opens the design editor with the AI tab showing the edit, where they can apply it or undo.

Internally track the `pageId` from the response — you'll need it for `/subframe:develop`, `additionalPages` for future designs, or `edit_page` for future edits — but don't mention it to the user.

### Iterating on Variations

Do NOT proactively call `get_variations` after `design_page`. The user reviews and selects variations in the Subframe editor, not in chat. Only call `get_variations` when the user comes back and explicitly asks to iterate on or combine designs — for example, "I like the layout from variation 1 but the color scheme from variation 3", or "keep the header from the current page but use the card layout from variation 2."

`get_variations` returns:
- **`currentPageCode`** — The current page code if the user has already accepted a variation for this page, or `null` if no variation has been accepted yet. This reflects the live state of the page, including any edits the user made in the Subframe editor.
- **`variations`** — The generated design variations from the most recent `design_page` call.

**Important:** The variations can be very token-heavy. After calling `get_variations`, extract `currentPageCode` from the response first — it determines your next step.

- **`currentPageCode` exists** — The user already has a page. Use `edit_page` with a description incorporating ideas from the variations or the user's feedback. You don't need to deeply analyze every variation — just reference the ones the user mentions.
- **`currentPageCode` is null** — The user hasn't accepted any variation yet. Use `design_page` to iterate, passing the relevant variation code via `codeContext` along with the user's feedback in the description. Note: this creates a new `pageId` — use it for subsequent `get_variations` calls.

### Updating Theme

If the user indicates an issue with their theme and requests changes, use the `edit_theme` tool to update the theme in Subframe. The designs in Subframe will then reflect those changes. `edit_theme` is able to update color, border, corner, and shadow tokens as well as typography. Use `get_theme` to understand the current theme before formulating your changes.

The `description` parameter should describe what changes you want to make to the theme. It can include exact token values if needed.

If you are currently working on a page with the user, you should pass that page information into the `edit_theme` tool call.

If a page is provided, the tool will return a URL where the user can review and apply the theme changes.
If no page is provided, the tool will return a URL where the user can see the updated project theme. The user cannot review the theme changes prior to application in this case, so it is best to provide a page identifier if any is available.

**Important:** The theme affects all pages in the project, so always make the user confirm that they want to update the whole project before using `edit_theme`. If the user only wants to update a particular page, you should use `edit_page` instead.