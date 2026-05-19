---
name: bulk-import
description: Bulk-import many components from an existing codebase to Subframe in one CLI batch. Use only when the user explicitly asks to use this exact skill. Available for select teams.
---

Bulk-import an existing design system into Subframe by discovering files on disk, building a manifest, and uploading via the CLI.

> **Use this skill only when the user explicitly asks to bulk-import many components in one batch** (e.g. "use the bulk import skill to upload all my components"). For any other "bring my design system into Subframe" request — default to `/subframe:design`'s incremental `design_component`, `design_snippet`, and `write_design_document` tools. Both paths route to the same underlying AI agent, so output quality is identical; bulk-import only saves orchestration time when the user genuinely wants to batch-submit many components in a single CLI invocation.

> **Availability:** This feature is currently only available for select teams. If the CLI returns an error like `"Design system import is not enabled for this team"`, this means the feature has not been enabled for the user's team. Direct the user to [request access here](https://tally.so/r/3jv511) or proceed with an incremental import. Do not retry or troubleshoot further — this is an access gate, not a bug.

**Goal state**: All design system files are uploaded to Subframe for processing.

## MCP Authentication

If you cannot find any Subframe MCP tools (like `list_projects`, `generate_auth_token`), the MCP server likely needs to be authenticated. Ask the user to authenticate the Subframe MCP server. If the user is using Claude Code or Codex, instruct them to run `/mcp` to view and authenticate their MCP servers, and then say "done" when they're finished.

## Credentials

The CLI needs an auth token and project ID. If the user hasn't provided these, use MCP tools to get these automatically:

1. **Project ID** — Call `list_projects` to get the list of projects. Each project includes a `projectId`, `name`, `teamId`, and `teamName`.
   - **One project**: Use it automatically.
   - **Multiple projects**: Always ask the user which project to use. Present each project with its `teamName` to disambiguate. If the user already mentioned a specific team or project name, match it against the `teamName` and `name` fields — but still confirm before proceeding. Never silently pick a project when multiple exist.
2. **Auth token** — Call `generate_auth_token` with the `teamId` from the user's selected project. Do not use a `teamId` from a different project.

The project ID is also visible in any Subframe URL: `app.subframe.com/<PROJECT_ID>/...`

**Fallback**: If the MCP tools are not available, direct the user to `https://app.subframe.com/cli/auth` to get their auth token and project ID.

---

## Workflow

### 1. Discover design system files

We only want **visual/presentational layer** files — the reusable UI primitives that make up the design system. Skip anything that's deeply coupled to business logic, data models, API calls, or application state.

**Include:**
- Pure UI components (buttons, inputs, cards, modals, badges, etc.)
- Layout primitives (containers, grids, stacks, etc.)
- Theme/styling files
- Stories

**Exclude:**
- Components that fetch data, call APIs, or manage application state
- Page-level components that wire together business logic
- Utility functions, hooks, or helpers that aren't visual
- Test files (other than stories)

Use Glob and Read tools to find files. Look for:

**Theme files** (global styling):
- `tailwind.config.*`
- Global CSS files (e.g. `globals.css`, `global.css`, `app.css`, `index.css`)
- Design token files (e.g. `tokens.json`, `tokens.ts`, `theme.ts`)

**Component files**:
- React component files (`.tsx`, `.jsx`) in component directories
- Story files (`.stories.tsx`, `.stories.jsx`, `.stories.ts`)
- Component CSS modules

Use these search strategies:
1. Look for `tailwind.config.*` at the project root
2. Look for global CSS in `src/styles/`, `src/`, `app/`, `styles/`
3. Look for components in common directories: `src/components/`, `components/`, `src/ui/`, `ui/`, `lib/components/`

When unsure whether a component is a design system primitive or an application component, quickly read the file — if it imports data-fetching libraries, stores, or API clients, skip it.

### 2. Group files by component

For each component, separate files into two categories:

**`entrypoint`** — the path to the main component file. Must reference one of the `sourceFiles`.

**`sourceFiles`** — the primary component implementation:
- The component source file(s) (`.tsx`, `.jsx`) containing markup and styles

**`supportingFiles`** — everything else that helps understand the component:
- Story files (`.stories.tsx`, `.stories.jsx`, `.stories.ts`)
- CSS modules (`.module.css`, `.module.scss`)
- Documentation files (`.md`)

Group by logical design system component — e.g. `Button.tsx` is a source file, while `Button.stories.tsx`, `Button.module.css`, and `Button.md` are supporting files for the "Button" component.

### 3. Write manifest

Create the `.subframe/` directory if it doesn't exist, then write the manifest:

```bash
mkdir -p .subframe
```

Write the manifest to `.subframe/import-design-system.json`:

```json
{
  "theme": [
    "tailwind.config.ts",
    "src/styles/globals.css"
  ],
  "components": [
    {
      "name": "Button",
      "entrypoint": "src/components/Button.tsx",
      "sourceFiles": [
        "src/components/Button.tsx"
      ],
      "supportingFiles": [
        "src/components/Button.stories.tsx",
        "src/components/Button.module.css"
      ]
    }
  ]
}
```

Component names must be unique. If there are conflicting component names, ask the user how they would like to resolve them, e.g. by adding a prefix based on the directory.

### 4. Show summary before uploading

Before running the CLI, print a summary so the user can spot any issues:
- List of component names
- List of theme files
- Total file count

Then proceed with the upload. The user can interrupt if something looks wrong.

### 5. Submit for import

Run the CLI to submit the design system for import. This uploads the files to Subframe and kicks off an asynchronous import job — it does not complete the import inline.

Always pass the auth token so the CLI doesn't prompt interactively.

```bash
npx @subframe/cli@latest import -p {PROJECT_ID} --manifest .subframe/import-design-system.json --auth-token {TOKEN}
```

If any files are missing the CLI will abort with an error. Otherwise, report to the user that the import has been submitted and will be processed shortly.

---

## Error Handling

- If the CLI exits with an error, show the full error output to the user
- **Access errors**: If the CLI returns `"Design system import is not enabled for this team"`, this is not a bug or auth issue — the import feature is only available for certain teams. Let the user know and direct them to [request access here](https://tally.so/r/3jv511). Do not retry with a new token or attempt workarounds.
- Auth errors: try generating a new token with `generate_auth_token`, or suggest the user re-authenticate at `https://app.subframe.com/cli/auth`
- Network errors: suggest checking connectivity and retrying
- If the manifest JSON is malformed, fix it and retry — don't ask the user to debug JSON
