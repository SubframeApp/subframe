---
name: setup
description: Initialize Subframe in a new or existing project. Sets up the CLI, syncs components, configures Tailwind and fonts.
argument-hint: "[your auth token and project ID]"
---

Set up Subframe in a project. Parse credentials from the user's input, detect the project framework, initialize the CLI, configure Tailwind and fonts, and start the dev server.

## Workflow

1. **Parse credentials** - Extract the auth token and project ID from the user's input
2. **Check initialization** - Look for `.subframe/sync.json` to see if Subframe is already set up
3. **Detect framework** - Determine if this is a new or existing project, and which framework it uses
4. **Check prerequisites** - Verify the project has the required dependencies
5. **Initialize** - Run the CLI init command with the right flags
6. **Verify configuration** - The CLI typically configures Tailwind, import aliases, and syncs components automatically. Check that everything was set up correctly, and fix anything the CLI missed.
7. **Configure fonts** - Use `get_theme` MCP tool to determine Google Fonts and add them (the CLI does not do this)
8. **Summarize** - Recap what was set up and mention `/subframe:design` and `/subframe:develop` as next steps

## Parse Credentials

The user will typically paste an installation prompt copied from **Code > Installation** in Subframe. Extract:

- **Auth token** - a long string, usually prefixed or labeled
- **Project ID** - a shorter alphanumeric string (also found in Subframe URLs: `app.subframe.com/<PROJECT_ID>/...`)

If the user doesn't provide credentials:

- **Auth token** — Ask them to go to `app.subframe.com/settings/tokens` to create a new auth token.
- **Project ID** — Found in the URL in the Subframe app: `app.subframe.com/<PROJECT_ID>/...`. For example, if the URL is `app.subframe.com/abcdef123456/library`, the project ID is `abcdef123456`.

## Detect Framework

Check for framework indicators:

| Framework       | Indicators                                                     |
| --------------- | -------------------------------------------------------------- |
| **Next.js**     | `next` in `package.json` dependencies, `next.config.*` file    |
| **Vite**        | `vite` in `package.json` devDependencies, `vite.config.*` file |
| **Astro**       | `astro` in `package.json` dependencies, `astro.config.*` file  |
| **New project** | No `package.json` in the current directory                     |

## Check Prerequisites

For existing projects, verify:

- **React 16+** - `react` in `package.json`
- **Tailwind CSS 3.4+** - `tailwindcss` in `package.json`
- **TypeScript** - `typescript` in `package.json`

If any are missing, let the user know before proceeding.

## Initialization Commands

For an **existing project**:

```bash
npx @subframe/cli@latest init --auth-token {TOKEN} -p {PROJECT_ID} --install --sync
```

For a **new project** (Vite):

```bash
npx @subframe/cli@latest init --auth-token {TOKEN} -p {PROJECT_ID} --dir ./src/ui --alias '@/ui/*' --install --tailwind --sync --template vite --name subframe-app
```

## Configure Tailwind

The CLI typically handles Tailwind configuration automatically during `init`. After initialization, verify the Tailwind config is wired up correctly. If the CLI missed it (or the project has a non-standard setup), apply the appropriate fix based on the Tailwind version:

**Tailwind v3** — Add the Subframe preset to `tailwind.config.js`:

```javascript
// In tailwind.config.js, add to module.exports:
presets: [require("./src/ui/tailwind.config")],
```

The `content` array must include the Subframe output directory:

```javascript
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
```

**Tailwind v4** — Import Subframe's generated `theme.css` in the global CSS file (e.g., `index.css`, `styles.css`, or `globals.css`):

```css
@import "tailwindcss";
@import "./ui/theme.css";
```

## Configure Import Aliases

The CLI typically sets up import aliases automatically during `init`. Verify that `@/*` aliases resolve correctly after initialization. If the CLI missed it (common with Vite and Astro), apply the fix manually:

**Vite** — Two changes needed:

1. Add `baseUrl` and `paths` to `tsconfig.app.json` (or `tsconfig.json`):

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. Install `@types/node` and add resolve aliases to `vite.config.ts`:

```bash
npm install -D @types/node
```

```typescript
import { resolve } from "node:path"

export default defineConfig({
  // ...existing config
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
```

**Astro** — Add `baseUrl` and `paths` to `tsconfig.json` (same as Vite step 1).

**Next.js** — Usually already configured. Check `tsconfig.json` has `@/*` paths if using the `src/` directory.

## Configure Fonts

After initialization, use the `get_theme` MCP tool to get the Tailwind theme config:

```
get_theme({ projectId: "PROJECT_ID" })
```

The theme config includes `fontFamily` entries that reference Google Fonts by name. Add the corresponding font imports based on the framework:

**Vite / Astro** — Add `<link>` tags to the `<head>` of `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Font+Name:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Next.js (App Router)** — Add `<link>` tags to the `<head>` in `app/layout.tsx`:

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Font+Name:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Next.js (Pages Router)** — Add to `pages/_document.tsx` inside the `<Head>` component.

Font link formatting:

- Replace spaces with `+` in font names (e.g., `Inter+Tight`)
- Include weights from the theme in the `wght@` parameter (semicolon-separated)
- Add one `<link>` per font family, but only one set of preconnect links

## Summarize

After all configuration, briefly recap what was set up and mention the `/subframe:design` and `/subframe:develop` skills for next steps.

## Important

- **Never modify files in the Subframe output directory** (e.g., `src/ui/`) — they get overwritten on sync.
- If you must edit a synced file, add `// @subframe/sync-disable` to the top to prevent overwrites.
