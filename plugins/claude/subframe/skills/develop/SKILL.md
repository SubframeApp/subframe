---
name: develop
description: Implement Subframe designs with business logic. Use after designing with /subframe:design or when given a Subframe URL/page ID.
argument-hint: "[page URL, page ID, or 'the design I just made']"
---

Implement Subframe designs in the codebase. Fetch the design via MCP, sync components, and add business logic.

## MCP Authentication

If you cannot find the `get_page_info` tool (or any Subframe MCP tools), the MCP server likely needs to be authenticated. Ask the user to authenticate the Subframe MCP server. If the user is using Claude Code or Codex, instruct them to run `/mcp` to view and authenticate their MCP servers, and then say "done" when they're finished.

## Detect Project State

Before starting, check for `package.json` and `.subframe/` folder in the current directory:

| Condition                                      | Action                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| No `package.json`                              | Run `/subframe:install` first — there's no project to implement into yet. |
| Has `package.json` AND has `.subframe/` folder | Proceed with the workflow below.                                          |
| Has `package.json` but NO `.subframe/` folder  | Ask the user (see below).                                                 |

### Existing non-Subframe project

If the current directory has a `package.json` but no `.subframe/` folder, ask the user which approach they prefer:

- **Use the design as inspiration** — Fetch the design via MCP for reference, but implement the page using the existing styles, components, and patterns already in the repo. Translate the Subframe design's layout and structure into whatever UI framework the project already uses (e.g., existing component library, CSS modules, styled-components). Do NOT install Subframe or sync components. Skip to [Inspiration Workflow](#inspiration-workflow).
- **Use Subframe styles and components** — Install Subframe into the project so the design renders pixel-perfect with Subframe's generated code. Run `/subframe:install` first, then continue with the [Workflow](#workflow) below.

## Workflow

1. **Wait for any in-flight design jobs** — see [Awaiting In-Flight Designs](#awaiting-in-flight-designs)
2. **Fetch the design** — `get_page_info` with the URL, ID, or name
3. **Read design documentation** — `get_project_info` and `get_component_info` return any attached design docs; check them for usage guidance, accessibility notes, or constraints before implementing
4. **Sync any missing components** — Only if components don't exist locally. `npx @subframe/cli sync` for the specific components used in the page
5. **Create the page** — put it in the right place per codebase patterns
6. **Add business logic** — data fetching, forms, events, loading/error states

## Awaiting In-Flight Designs

If a design was just kicked off in the same conversation (via `/subframe:design`), the underlying AI job is likely still running. Reading the result via `get_*_info` too early returns empty or stale code.

`design_page`, `design_component`, and `edit_component` return a `jobId`. Before the first read, call:

```
wait_for_jobs({ jobIds: [jobId1, jobId2, ...] })
```

Each result is `running`, `done` (with optional summary), or `not_found`. Call in a loop until every job is `done`. Surface progress to the user — "Designs are still generating in Subframe…" then "✓ Designs ready, fetching the code now." — so they understand the wait. (Jobs that stall longer than ~10 minutes are surfaced as `done` so the loop never hangs.)

You don't need `wait_for_jobs` when:

- The user came in with an existing Subframe URL (no in-flight job)
- You're only working from `id` or `name` and don't need the generated code.

If the user asks to implement immediately after kicking off a design, batch all relevant `jobIds` into a single `wait_for_jobs` call (it accepts up to 10).

## Inspiration Workflow

Use this workflow when the user chose to use the design as inspiration in an existing non-Subframe project.

1. **Wait for any in-flight design jobs** — see [Awaiting In-Flight Designs](#awaiting-in-flight-designs).
2. **Fetch the design** — Use `get_page_info` with the URL, ID, or name to get the page's layout and structure. If you encounter Subframe components or tokens you're unfamiliar with, use `get_component_info` to understand a component's props and behavior, or `get_theme` to see the Subframe project's design tokens (colors, fonts, spacing, shadows).
3. **Study existing patterns** — Look at the codebase's existing components, styles, and conventions. Identify local equivalents for Subframe components used in the design.
4. **Create the page** — Implement the design using the codebase's existing UI framework, translating the Subframe layout and component structure into local components and styling.
5. **Add business logic** — Data fetching, forms, events, loading/error states.

## Fetching Designs

Pages are the only resource you fetch into the codebase. Use `get_page_info` with a URL, ID, or name:

```
get_page_info({ url: "https://app.subframe.com/PROJECT_ID/design/PAGE_ID/edit" })
get_page_info({ id: "PAGE_ID", projectId: "PROJECT_ID" })
get_page_info({ name: "Settings Page", projectId: "PROJECT_ID" })
```

To discover what exists in the project, use `list_pages`, `list_components`, or `list_flows`. Snippets aren't synced to code — they live in Subframe as design system references.

Read design documentation alongside the design: `get_project_info` returns project-level `docs` (broad principles), and `get_component_info` returns each component's `designDocuments` (component-specific usage guidance). Pick these up before implementing so you respect documented constraints.

Get the `projectId` from `.subframe/sync.json`. If `.subframe/sync.json` doesn't exist or doesn't contain a `projectId`, call `list_projects` to get the available projects. Each project includes a `projectId`, `name`, `teamId`, and `teamName`.
- **One project**: Use it automatically.
- **Multiple projects**: Always ask the user which project to use. Present each project with its `teamName` to disambiguate. If the user already mentioned a specific team or project name, match it against the `teamName` and `name` fields — but still confirm before proceeding. Never silently pick a project when multiple exist.

## Syncing Components

Sync components when they don't exist locally. You can sync specific components by name:

```bash
npx @subframe/cli@latest sync Button Alert TextField
```

Or sync all components:

```bash
npx @subframe/cli@latest sync --all
```

**When to sync:**

- **Components don't exist locally** → Sync those specific components before implementing
- **Components already exist** → Don't sync automatically. If the user wants the latest versions, they'll ask.

**Don't modify `Button.tsx`** — Subframe generates and overwrites it on every sync. Each component syncs as a directory:

```
components/Button/
├─ Button.tsx   // generated by Subframe — overwritten on every sync
└─ index.tsx    // wrapper — re-exports Button.tsx; your code goes here
```

`index.tsx` is the import entrypoint (`@/ui/components/Button` resolves to it). Add wrapping logic there.

### Sync Disable

To keep your changes to a file, add `// @subframe/sync-disable` to the top of it — the CLI skips any file containing this comment:

```tsx
// @subframe/sync-disable
import { Button as ButtonComponent } from "./Button"
// ... your wrapper
```

Add it to the wrapper `index.tsx` once you've customized it. `Button.tsx` has no marker, so it still receives Subframe's updates. As a last resort you can sync-disable `Button.tsx` itself, but that freezes the component entirely.

**Updating a sync-disabled file:**

If a file has `@subframe/sync-disable`, the sync command skips it. To get the latest version of that file:

1. Use `get_component_info` to fetch the latest code from Subframe
2. Manually merge the changes with the local modifications

## Adding Business Logic

Subframe generates presentational code with placeholder data. You add:

**Data fetching:**

```tsx
const { data, isLoading, error } = useQuery(...)

if (isLoading) return <Skeleton />
if (error) return <Alert variant="error">{error.message}</Alert>

return <PageComponent {...data} />
```

**Form handling:**

```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  await submitForm(formData)
}
```

**Event handlers:**

```tsx
<Button onClick={handleClick}>Submit</Button>
<Card actionSlot={<IconButton onClick={handleDelete} />} />
```

## Dark Mode

If the Subframe project has dark mode enabled, the synced theme uses CSS variables with `.dark` class overrides. To activate dark mode in the app, set the `dark` class on the `<html>` element — using `next-themes`, a React theme provider context, or any other method.

## Updating Existing Pages

When a design changes:

1. Fetch the updated design
2. Update layout/structure from new design
3. Preserve existing hooks, handlers, and state management
4. Sync any new components

When diffing the updated design against the existing code, if there are design changes beyond what the user asked you to design (e.g., layout tweaks, new elements, removed sections), call those out and ask whether to include them.

## MCP Tools Reference

| Tool                 | Purpose                                                  | Key Parameters                      |
| -------------------- | -------------------------------------------------------- | ----------------------------------- |
| `get_page_info`      | Fetch page code                                          | `url`, `id`, or `name`; `projectId` |
| `get_component_info` | Fetch component code + attached design doc               | `url`, `id`, or `name`; `projectId` |
| `get_project_info`   | Fetch project metadata + project-level design docs       | `projectId`                         |
| `get_flow_info`      | Enumerate pages in a flow                                | `id`, `name`, or `url`; `projectId` |
| `list_pages`         | List all pages                                           | `projectId`                         |
| `list_components`    | List all components                                      | `projectId`                         |
| `list_flows`         | List all flows                                           | `projectId`                         |
| `get_theme`          | Get Tailwind config                                      | `projectId`, `cssType`              |
| `wait_for_jobs`      | Wait for in-flight design jobs to finish before reading  | `jobIds` (1-10)                     |
