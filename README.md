# Subframe

[Subframe](https://subframe.com) is a design tool for your codebase. Design on a canvas, preview and edit your running app in the built-in browser, and ask a coding agent to implement changes in your local project.

- **Canvas:** create and refine designs with web layout, reusable components, and theme tokens.
- **Browser:** make temporary visual edits to your running app or capture a page as an editable design.
- **Agent:** work across designs and code with Claude Code, Codex, or Subframe AI credits. Connect a local folder in the desktop app to implement changes in your codebase.

You can also build a React and Tailwind component library in Subframe and use the CLI to sync its generated components and theme into your app.

[Get started](https://docs.subframe.com/quickstart) · [Download the desktop app](https://subframe.com/downloads) · [Read the docs](https://docs.subframe.com)

## This repository

This repository contains Subframe's open-source packages, starter kits, and documentation:

| Directory | Purpose |
| --- | --- |
| [`packages/subframe-core`](packages/subframe-core) | `@subframe/core`: interactive primitives, icons, charts, and utilities used by generated components. |
| [`packages/subframe-cli`](packages/subframe-cli) | `@subframe/cli`: set up a project and sync generated components, layouts, icons, and theme files. |
| [`packages/docs`](packages/docs) | The [documentation site](https://docs.subframe.com), built with Mintlify. |
| [`starter-kits`](starter-kits) | React and Tailwind starter projects for Next.js, Vite, and Astro. |

To use Subframe in your app, follow the [installation guide](https://docs.subframe.com/develop/installation).

## Working on this repository

Use Node.js 24 and npm 11, then install dependencies from the repository root:

```bash
npm install
```

Preview the documentation:

```bash
npm run dev --workspace=@subframe/docs
```

See the [docs README](packages/docs/README.md) for content checks. For package changes, run the relevant workspace's `test`, `ts`, and `lint` scripts.

## Community

Join the [Subframe Slack community](https://join.slack.com/t/subframecommunity/shared_invite/zt-380uma6dv-_lr7_bDLU5DJcoygfUYkeQ) for help and feedback, or follow [@SubframeApp](https://x.com/SubframeApp).
