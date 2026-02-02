---
name: design
description: Design UI pages using Subframe. Use proactively whenever a task involves creating or updating UI - don't write UI code directly.
argument-hint: "[description of what to design]"
---

Design pages using the `design_page` MCP tool.

**Don't write UI code directly.** Subframe generates production-ready React/Tailwind code that matches the design system. Design first, then implement with `/subframe:develop`.

## Subframe Basics

- **Components** (buttons, inputs, cards): Synced via CLI. Source of truth in Subframe. Don't modify locally.
- **Pages** (screens): Exported via MCP. Add business logic after export.

Subframe knows about the design system and theme. Your job is to provide context from the user's codebase.

## Workflow

1. **Understand the request** - If vague, ask clarifying questions first. What data? What actions? Who uses it?
2. **Find the projectId** - Check `.subframe/sync.json`
3. **Gather context and decide variations** - Scale to the task (see below)
4. **Call `design_page`**
5. **Share results** - Present the review URL as a clickable link — this is the primary output for the user. Note the pageId for later.

## Context and Variations

How much context to gather and how many variations to generate depends on the task:

| Task                           | Context                                                           | Variations                           |
| ------------------------------ | ----------------------------------------------------------------- | ------------------------------------ |
| **New page**                   | Similar pages, data types                                         | 4 — explore the design space         |
| **Adding or edit existing UI** | The existing page, relevant data types                            | 2 — match the pattern, offer options |
| **Redesigning existing UI**    | The current page (note what to keep vs change in the description) | 2-4 — depending on how open-ended    |

**Always include when available:**

- Similar existing pages (the single most valuable context)
- Components or patterns the user explicitly mentions
- Data types/interfaces for what the page will display

### Variations

Each variation is a prompt that drives a unique design direction. Make them meaningfully different:

- "Compact data table with inline actions and bulk operations"
- "Card-based layout with visual hierarchy and quick filters"
- "Minimal single-column design focused on the primary action"

More variations = more exploration. Fewer = more focused. Don't overthink it.

## Multi-Page Requests

When designing multiple related pages (flows, CRUD, etc.):

1. Design the primary page first with more variations to establish the direction
2. After user approves, design remaining pages using the first as context

## After Designing

Always present the `reviewUrl` as a clickable markdown link — it's the most important thing for the user to see. They need it to preview and select a variation in Subframe. Also note the `pageId` — they'll need it for `/subframe:develop` to implement the page with business logic.
