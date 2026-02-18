---
name: import
description: Import an existing design system into Subframe. Discovers component files, stories, and CSS/Tailwind config, then uploads everything to Subframe for processing.
---

Import an existing design system into Subframe by discovering files on disk, building a manifest, and uploading via the CLI.

**Goal state**: All design system files are uploaded to Subframe for processing.

## Credentials

The CLI needs an auth token and project ID. If the user hasn't provided these, direct them to:

1. Go to `https://app.subframe.com/cli/auth`
2. Copy the **project ID** and **auth token** shown on that page

The project ID is also visible in any Subframe URL: `app.subframe.com/<PROJECT_ID>/...`

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

For each component, gather everything needed to understand its visual layer:
- **Required:** The component source file(s) (markup + styles)
- **Helpful if they exist:** Stories, CSS modules, and `.md` documentation files

Group by logical design system component — e.g. `Button.tsx`, `Button.stories.tsx`, `Button.module.css`, `Button.md` all belong to the "Button" component.

### 3. Write manifest

Write the manifest to `/tmp/subframe-import-manifest.json`:

```json
{
  "theme": [
    "tailwind.config.ts",
    "src/styles/globals.css"
  ],
  "components": [
    {
      "name": "Button",
      "sources": [
        "src/components/Button.tsx",
        "src/components/Button.stories.tsx"
      ]
    }
  ]
}
```

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
npx @subframe/cli@latest import -p {PROJECT_ID} --manifest /tmp/subframe-import-manifest.json --auth-token {TOKEN}
```

If any files are missing the CLI will abort with an error. Otherwise, report to the user that the import has been submitted and will be processed shortly.

---

## Error Handling

- If the CLI exits with an error, show the full error output to the user
- Auth errors: suggest the user check their token or re-authenticate at `https://app.subframe.com/cli/auth`
- Network errors: suggest checking connectivity and retrying
- If the manifest JSON is malformed, fix it and retry — don't ask the user to debug JSON
