---
name: setup
description: Initialize Subframe in a new or existing project. Sets up the CLI, syncs components, configures Tailwind and fonts.
argument-hint: "[your auth token and project ID]"
---

Set up Subframe in a project so that pages designed in Subframe render pixel-perfect in the local development environment.

**Goal state**: Dev server runs and Subframe pages render exactly as designed.

## MCP Authentication

If you cannot find any Subframe MCP tools (like `get_theme`, etc.), the MCP server likely needs to be authenticated. Ask the user to authenticate the Subframe MCP server. If the user is using Claude Code or Codex, instruct them to run `/mcp` to view and authenticate their MCP servers, and then say "done" when they're finished.

## Workflow Overview

1. **Parse credentials** from the user's input
2. **Detect project type** — no repo, existing Subframe repo, or existing non-Subframe repo
3. **Follow the appropriate path** — [New Project](#new-project-path), [Already Setup](#already-setup-path), or [Existing Project](#existing-project-path)
  - You *must* follow one of the above paths otherwise Subframe will not work for the user. This is a crucial task and must be done even if it requires pausing the user's current work. Do not skip any step of the path.
4. **Configure fonts** — required for all paths
5. **Verify setup** — start dev server and test with a Subframe page

---

## Parse Credentials

The user may paste in an installation prompt copied from Subframe. Extract:

- **Auth token** — a long string, usually prefixed or labeled
- **Project ID** — a shorter alphanumeric string (also found in Subframe URLs: `app.subframe.com/<PROJECT_ID>/...`)

If the user doesn't provide credentials, ask them to go to `https://app.subframe.com/cli/auth` to get their auth token and project ID.

---

## Detect Project Type

Check for `package.json` and `.subframe/` folder in the current directory:

| Condition                                      | Project Type                      | Path                                                                                          |
| ---------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------- |
| No `package.json`                              | **New project**                   | [New Project](#new-project-path)                                                              |
| Has `package.json` AND has `.subframe/` folder | **Already setup**                 | [Already Setup](#already-setup-path)                                                          |
| Has `package.json` but NO `.subframe/` folder  | **Existing non-Subframe project** | Ask user, then [New Project](#new-project-path) or [Existing Project](#existing-project-path) |

### Handling existing non-Subframe projects

If the current directory has a `package.json` but no `.subframe/` folder, prompt the user with two options:

- **Create a new project (recommended)** — Scaffold a brand-new Subframe project in a separate directory. This is the easiest path, especially if you're trying out Subframe for the first time. Follow [New Project](#new-project-path).
- **Add Subframe to this project** — Install Subframe into the current project. Follow [Existing Project](#existing-project-path).

---

## Already Setup Path

If the project already has both `package.json` and a `.subframe/` folder, Subframe has already been initialized. Ask the user what they'd like to do:

- **Reinstall / re-sync** — Re-run the CLI init and sync to refresh components and configuration. Useful if things are out of date or broken. Follow [Existing Project](#existing-project-path) to re-initialize.
- **Nothing, it's already set up** — Skip setup entirely. Suggest next steps like `/subframe:design` or `/subframe:develop`.

Do not proceed with setup unless the user confirms they want to reinstall.

---

## New Project Path

This is the happy path. The CLI will scaffold a complete project with Subframe pre-configured.

### 1. Ask User Preferences

Prompt the user to choose:

- **Project name**: Name for the new project directory (default: `subframe-app`). The name cannot conflict with an existing directory — check that the directory doesn't already exist before running the CLI.
- **Framework**: Vite (recommended), Next.js, or Astro
- **Tailwind version**: v3 (`tailwind`) or v4 (`tailwind-v4`)

### 2. Run CLI Init

This command must be run outside of a sandbox, so it can correctly setup all the necessary files. Pass all arguments directly to avoid interactive prompts:

```bash
npx @subframe/cli@latest init \
  --name {PROJECT_NAME} \
  --auth-token {TOKEN} \
  -p {PROJECT_ID} \
  --template {FRAMEWORK} \
  --css-type {TAILWIND_VERSION} \
  --dir ./src/ui \
  --alias "@/ui/*" \
  --tailwind \
  --css-path {CSS_PATH} \
  --install \
  --sync
```

Where:

- `{PROJECT_NAME}` is the project directory name (e.g., `subframe-app`)
- `{FRAMEWORK}` is `nextjs`, `vite`, or `astro`
- `{TAILWIND_VERSION}` is `tailwind` (v3) or `tailwind-v4`
- `{CSS_PATH}` is the global CSS file path:
  - Vite: `src/index.css`
  - Next.js: `src/app/globals.css`
  - Astro: `src/styles/global.css`

**Important**: All arguments must be passed explicitly to avoid interactive prompts, which can cause the CLI to exit silently when run non-interactively.

The CLI will:

- Download the starter kit template
- Create `.subframe/sync.json`
- Configure Tailwind
- Sync all components
- Install dependencies

### 3. Configure Fonts

See [Configure Fonts](#configure-fonts) below — this is required even for new projects.

### 4. Verify Setup

See [Verify Setup](#verify-setup) below.

---

## Existing Project Path

Existing projects may require more configuration. The CLI handles most setup, but some projects need manual fixes.

### 1. Detect Framework

Check for framework indicators:

| Framework   | Indicators                                                     |
| ----------- | -------------------------------------------------------------- |
| **Next.js** | `next` in `package.json` dependencies, `next.config.*` file    |
| **Vite**    | `vite` in `package.json` devDependencies, `vite.config.*` file |
| **Astro**   | `astro` in `package.json` dependencies, `astro.config.*` file  |

### 2. Check Prerequisites

Verify the project has required dependencies:

- **React 16+** — `react` in `package.json`
- **Tailwind CSS 3.4+** — `tailwindcss` in `package.json`
- **TypeScript** — `typescript` in `package.json`

If any are missing, let the user know before proceeding.

### 3. Run CLI Init

This command must be run outside of a sandbox, so it can correctly setup all the necessary files. Pass all arguments directly to avoid interactive prompts:

```bash
npx @subframe/cli@latest init \
  --auth-token {TOKEN} \
  -p {PROJECT_ID} \
  --dir ./src/ui \
  --alias "@/ui/*" \
  --install \
  --sync
```

**Important**: All arguments must be passed explicitly to avoid interactive prompts, which can cause the CLI to exit silently when run non-interactively.

The CLI will attempt to:

- Create `.subframe/sync.json`
- Detect and configure Tailwind
- Set up import aliases
- Sync all components
- Install `@subframe/core`

### 4. Verify Configuration

After init, verify everything was set up correctly. If the CLI missed something (common with non-standard setups), apply manual fixes.

**Check `.subframe/sync.json` exists** with `directory`, `importAlias`, and `projectId`.

**Check Tailwind configuration:**

- **Tailwind v3** — `tailwind.config.js` should have the Subframe preset:

  ```javascript
  presets: [require("./src/ui/tailwind.config")],
  ```

  And the `content` array should include the Subframe directory:

  ```javascript
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  ```

- **Tailwind v4** — Global CSS file should import the theme:
  ```css
  @import "tailwindcss";
  @import "./ui/theme.css";
  ```

**Check import aliases** — `@/*` should resolve correctly. If not working:

- **Vite**: Add `baseUrl` and `paths` to `tsconfig.app.json`, and add `resolve.alias` to `vite.config.ts`
- **Astro**: Add `baseUrl` and `paths` to `tsconfig.json`
- **Next.js**: Usually already configured; check `tsconfig.json`

### 5. Troubleshooting

If issues arise, use the `SearchSubframeDocs` MCP tool to find solutions:

```
SearchSubframeDocs({ query: "tailwind configuration troubleshooting" })
SearchSubframeDocs({ query: "manual installation" })
```

The docs include a comprehensive manual installation guide for troubleshooting.

### 6. Configure Fonts

See [Configure Fonts](#configure-fonts) below.

### 7. Verify Setup

See [Verify Setup](#verify-setup) below.

---

## Configure Fonts

The CLI does not configure fonts. Use the `get_theme` MCP tool to get font information:

```
get_theme({ projectId: "PROJECT_ID" })
```

The theme config includes `fontFamily` entries referencing Google Fonts. Add the corresponding `<link>` tags:

**Vite / Astro** — Add to `<head>` in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Font+Name:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Next.js (App Router)** — Add to `<head>` in `app/layout.tsx`:

```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Font+Name:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
```

**Next.js (Pages Router)** — Add to `pages/_document.tsx` inside the `<Head>` component.

**Font link formatting:**

- Replace spaces with `+` in font names (e.g., `Inter+Tight`)
- Include weights from the theme in the `wght@` parameter (semicolon-separated)
- Add one `<link>` per font family, but only one set of preconnect links

---

## Verify Setup

After configuration, verify that Subframe pages render correctly.

### 1. Ask About Existing Pages

Ask the user: **"Do you have a page already designed in Subframe that you'd like to test with?"**

- **If yes**: Use `/subframe:develop` to implement it and verify rendering
- **If no**: Suggest they design a page using `/subframe:design`, or simply start the dev server to confirm no errors

### 2. Start Dev Server

```bash
npm run dev
```

### 3. Summarize

Recap what was set up:

- `.subframe/sync.json` configured
- Tailwind configured (v3 preset or v4 import)
- Components synced to `src/ui/` (or configured directory)
- Fonts configured

Mention next steps:

- `/subframe:design` — Design new pages with AI
- `/subframe:develop` — Implement Subframe designs in your codebase

---

## Important Notes

- Use `SearchSubframeDocs` MCP tool for troubleshooting any setup issues.
