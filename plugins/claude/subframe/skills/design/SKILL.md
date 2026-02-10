---
name: design
description: Design UI pages in Subframe. Use when building new UI, iterating on existing UI, exploring design options, or to get a visual starting point to refine in the Subframe design tool. Don't write UI code directly - design first, then implement with /subframe:develop.
argument-hint: "[description of what to design]"
---

Design pages using the `design_page` MCP tool. This creates AI-generated design variations that the user can preview, select, and refine visually in the Subframe editor. When finished designing, the page can then be implemented in code.

**Don't write UI code directly.** Subframe generates production-ready React/Tailwind code that matches the design system. Design first, then implement with `/subframe:develop`.

## When to Use This

Use `/subframe:design` when the user:

- **Needs UI while coding**
- **Wants to explore design options**
- **Has codebase context that should inform the design**
- **Wants a starting point to refine in a design tool**
- **Is collaborating on designs with a team**

The key value: `/subframe:design` and `/subframe:develop` bridge coding and design. They work in both directions — create designs while coding and then ensure your code exactly reflects your design.

## MCP Authentication

If you cannot find the `design_page` tool (or any Subframe MCP tools), the MCP server likely needs to be authenticated. Ask the user to authenticate the Subframe MCP server. If the user is using Claude Code, instruct them to run `/mcp` to view and authenticate their MCP servers.

## Subframe Basics

- **Components** (buttons, inputs, cards): Synced via CLI. Source of truth in Subframe. Don't modify locally.
- **Pages** (screens): Designed via AI or editor. Exported via MCP. Add business logic after export.

Subframe knows about the design system and theme. Your job is to provide context from the user's codebase.

## Workflow

1. **Understand the request** — If vague, ask clarifying questions. What data? What actions? Who uses it?
2. **Find the projectId** — Check `.subframe/sync.json`. If there is no projectId found, ask the user to go to `https://app.subframe.com/cli/auth` to get a project ID.
3. **Gather context and decide variations** — Scale to the task (see below)
4. **Choose a flowName** — Group related pages together (e.g., "Settings", "Onboarding", "Checkout")
5. **Call `design_page`**
6. **Present the review URL** — This is the primary output. The user will preview variations and choose next steps.

## Context and Variations

How much context to gather and how many variations to generate depends on the task:

| Task                           | Context                                                           | Variations                           |
| ------------------------------ | ----------------------------------------------------------------- | ------------------------------------ |
| **New page (open-ended)**      | Data types (`codeContext`)                                        | 4 — explore the design space         |
| **New page (with reference pages)** | Reference pages (`additionalPages` if in Subframe, `codeContext` if not), data types (`codeContext`) | 1-2 — stay close to the reference pages |
| **Adding or editing existing UI** | The existing page (`additionalPages` if in Subframe, `codeContext` if not), relevant data types (`codeContext`) | 1-2 — match the existing pattern     |
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

## Multi-Page Requests

When designing multiple related pages (flows, CRUD, etc.):

1. Design the primary page first with more variations to establish the direction
2. After user selects a variation, design remaining pages passing the relevant pages via `additionalPages` as context
3. Use the same `flowName` to group related pages together

## After Designing

Present the `reviewUrl` as a clickable markdown link — it's the most important output. The user will:

1. **Preview variations** — See each design option rendered
2. **Select a variation** — Choose the one that best fits their needs
3. **Choose next steps:**
   - **"Copy MCP link"** → Use with `/subframe:develop` to implement in code with business logic
   - **"Open in editor"** → Refine visually in Subframe's full design editor, collaborate with team

Internally track the `pageId` from the response — you'll need it for `/subframe:develop` or `additionalPages` for future designs — but don't mention it to the user.
