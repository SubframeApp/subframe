---
name: design
description: Design UI pages in Subframe. Use when building new UI, iterating on existing UI, exploring design options, or to get a visual starting point to refine in the Subframe design tool. Don't write UI code directly - design first, then implement with /subframe:develop.
argument-hint: "[description of what to design]"
---

Design pages using the `design_page` and `edit_page` MCP tools. `design_page` creates a set of AI-generated design variations that all land as pages in a Subframe flow when the user opens the review URL. `edit_page` applies targeted changes directly to an existing Subframe page. Both produce designs the user can refine visually in the Subframe editor and then implement in code. Update the theme for the entire project using `edit_theme`.

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
2. **Find the projectId** — Check `.subframe/sync.json` if it exists. If there is no `.subframe/sync.json` or no projectId found, call `list_projects` to get the available projects. Each project includes a `projectId`, `name`, `teamId`, and `teamName`.
   - **One project**: Use it automatically.
   - **Multiple projects**: Always ask the user which project to use. Present each project with its `teamName` to disambiguate. If the user already mentioned a specific team or project name, match it against the `teamName` and `name` fields — but still confirm before proceeding. Never silently pick a project when multiple exist.
3. **Decide: `design_page` or `edit_page`?** Then call the respective MCP tool:
   - **`design_page`** → Creating something new, exploring multiple directions, or redesigning existing UI where the user wants options to choose from
   - **`edit_page`** → Making targeted changes to a Subframe page that was just created in this session (via `design_page`) or that the user provided via an MCP link
4. **Present the review URL** — This is the primary output. The user will preview and choose next steps.

## `design_page` — New Pages & Redesigns

Use `design_page` when:

- Creating a new page from scratch
- Redesigning or rethinking existing UI — if there's an existing implementation in code, use `design_page` when the user wants to explore new design directions or add new features
- Recreating an existing UI from code exactly as a starting point to design in Subframe
- The user wants options to choose from (multiple variations)

### Context and Variations

How much context to gather and how many variations to generate depends on the task:

| Task                           | Context                                                           | Variations                           |
| ------------------------------ | ----------------------------------------------------------------- | ------------------------------------ |
| **New page (open-ended)**      | Data types (`codeContext`)                                        | 4 — explore the design space         |
| **New page (with reference pages)** | Reference pages (`additionalPages` if in Subframe, `codeContext` if not), data types (`codeContext`) | 1-2 — stay close to the reference pages |
| **Redesigning existing UI**    | The current page (`additionalPages` if in Subframe, `codeContext` if not; note what to keep vs change in the description) | 2-4 — depending on how open-ended    |
| **Recreating an existing UI** | The current page's exact markup and styles (`codeContext`) | 1 - recreate the UI from code exactly |

**Always include when available:**

- The existing page being discussed and similar existing pages (the single most valuable context). Use `additionalPages` for Subframe pages — pass the page ID from a pasted MCP link, or a specific variation page ID the user has referenced. Use `codeContext` for pages that only exist in the codebase.
- Components or patterns the user refers to or explicitly mentions (via `codeContext`)
- Data types/interfaces for what the page will display (via `codeContext`)

### Preparing codeContext

When including code in `codeContext`, distinguish between Subframe components and non-Subframe components:

- **Subframe components** are imported from the synced Subframe directory (configured in `.subframe/sync.json` — typically `@/ui` or `src/ui`) or from `@subframe/core`. Include these as-is — Subframe understands its own components.
- **All other components** are application components. Do NOT pass these by name. Instead, read the component's source and inline its rendered JSX and Tailwind classes into `codeContext`. If the expanded markup uses Subframe components internally, keep those Subframe references intact.

For example, if a page uses `<LoginForm />` and it's not from the Subframe directory, expand it into the form's JSX markup (inputs, buttons, layout, Tailwind classes) rather than passing `<LoginForm />`.

### Variations

Each variation is an object with a `name` (short name) and `description` (a few sentence prompt describing the design direction).

**When you have reference pages** (`additionalPages`), use fewer variations (1-2) and keep them grounded in the reference. The variations should refine or extend the existing design, not diverge from it. For example:
- `{ "name": "Adapted layout", "description": "Follow the same layout as the reference page but adapted for [new content]" }`
- `{ "name": "Compact data-dense", "description": "Same structure as the reference but with a more compact, data-dense layout." }`

**When starting from scratch** (no `additionalPages`), use more variations (4) to explore the design space:
- `{ "name": "Data table", "description": "Compact data table with inline actions and bulk operations." }`
- `{ "name": "Card grid", "description": "Card-based layout with visual hierarchy and quick filters." }`
- `{ "name": "Minimal single-column", "description": "Minimal single-column design focused on the primary action." }`
- `{ "name": "Split panel", "description": "Split-panel layout with sidebar navigation and detail view." }`

More variations = more exploration. Fewer = more focused. Default to fewer when strong context exists.

### Multi-Page Requests

When designing multiple related pages (flows, CRUD, etc.):

1. Design the primary page first with more variations to establish the direction
2. After the user has reviewed the variations in the flow editor, design remaining pages passing the relevant variation page(s) via `additionalPages`. Have the user paste an MCP link to the variation they want as reference, or use `get_flow_info` with the `flowId` to enumerate the pages in the flow and ask which to use.
3. Use the same `flowName` to group related pages together

## `edit_page` — Targeted Edits to an Existing Page

Use `edit_page` for targeted changes to a specific Subframe page. Provide a page identifier and a description of the changes — Subframe handles the rest.

- **`description`**: Describe what to change. You can include code snippets for precision, but it's not required.
- **Page identifier**: `id`, `name`, or `url`. Use `list_pages` to find existing pages if needed.

The edit is applied immediately. Present the returned `pageUrl` to the user so they can view the updated page in Subframe.

### When to use `edit_page` vs `design_page`

- **`edit_page`**: Targeted changes to an existing Subframe page. Fast and precise.
- **`design_page`**: New pages, redesigns, or exploring multiple design directions.

**When NOT to use `edit_page`:** If the user has existing UI in their codebase but no corresponding Subframe page, or if they want to explore multiple design options, use `design_page` instead.

## After Designing

For `design_page`, present the `reviewUrl` as a clickable markdown link. When the user opens it, all variations are placed as pages in the same Subframe flow — the user reviews them side-by-side on the flow canvas. They may keep multiple, edit them, delete some, or just leave them all in the flow; there's no formal "pick one" step.

From there, the user may continue refining in Subframe or return here and ask you to implement the design in code. Do NOT ask the user which variation they prefer or present variation options as a multiple choice in chat. Simply present the review URL and let them know they can ask you to implement once they're ready.

If you need to enumerate the variation pages programmatically (e.g., to reference one in `additionalPages` or to read its current code with `get_page_info`), call `get_flow_info` with the `flowId` returned by `design_page`. This works *after* the user has opened the review URL — variations don't exist as pages until then. To read variation code *before* the user has opened the review URL, use `get_variations` with the `requestId` returned by `design_page` (it reads directly from the in-progress generation).

For `edit_page`, the edit is applied immediately. Present the returned `pageUrl` as a clickable markdown link so the user can view the updated page in Subframe. The user can undo the edit in the editor if needed.

Internally track the `flowId` and `requestId` returned by `design_page`. Don't surface either to the user.

- `flowId` — the destination flow. Use with `get_flow_info` for follow-up flow-level operations, or pass the same `flowName` on subsequent `design_page` calls to keep new variations grouped.
- `requestId` — the specific design_page call. Use with `get_variations` to read variation code while it streams (before the user opens the review URL).

For `/subframe:develop`, `additionalPages`, or `edit_page`, use specific page IDs the user has referenced (via pasted MCP link or while iterating in the editor), or call `get_flow_info` to look them up by name — `design_page` itself doesn't return individual page IDs since all variations get applied at once.

### Iterating on Variations

The user reviews and refines variations in the Subframe editor, not in chat. When they come back asking to combine ideas, refine a specific direction, or iterate further:

- **They reference a specific variation** (by pasted MCP link, by name, or by describing it). If you need to find the variation's `pageId`, call `get_flow_info` with the `flowId` from the original `design_page` response — it returns the pages in the flow with names and IDs. Then use `edit_page` with that page's id for targeted changes, or call `design_page` with the page passed via `additionalPages` if they want a fresh set of options grounded in that direction.
- **They want to mix variations** ("I like the layout from variation 1 but the colors from variation 3"). Ask them to paste the MCP links of the variations they want to combine (or use `get_flow_info` to look up page IDs by name), then call `design_page` with those pages via `additionalPages` and a description of the combination.
- **They want to start over** ("none of these are right"). Call `design_page` again with a refined description and any reference pages via `additionalPages`. Use the same `flowName` to keep related work grouped.
- **They want a read on the variations before opening the review URL** ("can you describe what each variation looks like before I click?"). Call `get_variations` with the `requestId` to read the streaming variation code, then describe what's there. Fine to offer this when it'd help the user decide — just don't reflexively call it after every `design_page`.

You don't have to read the generated variation code by default — Subframe renders the variations and the user reviews them visually in the flow editor, so summarizing them in chat usually isn't useful. But when reading the code would genuinely help (the user asks what was generated, you're picking which variation to extend, etc.), go ahead and call `get_variations` or `get_page_info` and talk about what you see.

### Updating Theme

Use `edit_theme` to update the visual theme of a Subframe project. This tool is designed for **targeted tweaks** and **high-level changes** to an existing theme:

- **Targeted tweaks**: Specific adjustments like "make the primary color darker", "increase border radius on all components", "switch the font to Inter", or "make shadows more subtle".
- **High-level changes**: Broader theme shifts like "switch to a dark theme", "make the design feel more modern and minimal", or "adopt a warm earth-tone palette".

`edit_theme` can update colors, fonts, corners, shadows, and typography tokens. Use `get_theme` to understand the current theme before formulating your changes.

**When NOT to use `edit_theme`:** If the user wants to import or replicate an entire existing design system theme (e.g. "set up our theme to match these design tokens from our codebase"), `edit_theme` is not the right approach. For full theme setup from existing tokens or files, direct the user to the theme import feature in the Subframe UI at `https://app.subframe.com/theme`, where they can upload their theme files directly. For importing a full design system (components + theme), use `/subframe:import` instead — but note that the import feature is only available for certain teams (see the import skill for details).

The `description` parameter should describe what changes you want to make to the theme. It can include exact token values if needed, or it can be a high-level description — the AI will interpret both.

If you are currently working on a page with the user, you should pass that page information into the `edit_theme` tool call.

If a page is provided, the tool will return a URL where the user can review and apply the theme changes.
If no page is provided, the tool will return a URL where the user can see the updated project theme. The user cannot review the theme changes prior to application in this case, so it is best to provide a page identifier if any is available.

**Important:** The theme affects all pages and components in the project, so always make the user confirm that they want to update the whole project before using `edit_theme`. If the user only wants to change the styling of a particular page (not the project-wide theme), use `edit_page` instead.