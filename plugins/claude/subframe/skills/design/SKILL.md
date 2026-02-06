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

## Subframe Basics

- **Components** (buttons, inputs, cards): Synced via CLI. Source of truth in Subframe. Don't modify locally.
- **Pages** (screens): Designed via AI or editor. Exported via MCP. Add business logic after export.

Subframe knows about the design system and theme. Your job is to provide context from the user's codebase.

## Workflow

1. **Understand the request** — If vague, ask clarifying questions. What data? What actions? Who uses it?
2. **Find the projectId** — Check `.subframe/sync.json`
3. **Gather context and decide variations** — Scale to the task (see below)
4. **Choose a flowName** — Group related pages together (e.g., "Settings", "Onboarding", "Checkout")
5. **Call `design_page`**
6. **Present the review URL** — This is the primary output. The user will preview variations and choose next steps.

## Context and Variations

How much context to gather and how many variations to generate depends on the task:

| Task                           | Context                                                           | Variations                           |
| ------------------------------ | ----------------------------------------------------------------- | ------------------------------------ |
| **New page**                   | Similar pages, data types                                         | 4 — explore the design space         |
| **Adding or editing existing UI** | The existing page, relevant data types                         | 2 — match the pattern, offer options |
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
2. After user selects a variation, design remaining pages using the first as context
3. Use the same `flowName` to group related pages together

## After Designing

Present the `reviewUrl` as a clickable markdown link — it's the most important output. The user will:

1. **Preview variations** — See each design option rendered
2. **Select a variation** — Choose the one that best fits their needs
3. **Choose next steps:**
   - **"Copy MCP link"** → Use with `/subframe:develop` to implement in code with business logic
   - **"Open in editor"** → Refine visually in Subframe's full design editor, collaborate with team

Also note the `pageId` — they'll need it for `/subframe:develop` if they choose to implement directly.
