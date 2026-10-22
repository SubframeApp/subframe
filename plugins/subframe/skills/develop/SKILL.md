---
name: develop
description: Implement or update Subframe designs using synced components or an app's own design system, set up Subframe components, or explain canvas and code sync.
argument-hint: "[Subframe design to implement, or local setup task]"
---

Implement Subframe designs in an application. For sync questions, explain the boundary below without changing files.

## Choose the source of truth

Before writing code, inspect the application package's .subframe/sync.json, synced directory, component imports, theme files, routes, and package.json. State which model the evidence supports:

- **Subframe owns the theme and components.** A sync configuration and generated components used by the app establish this model. Build pages from those components. Keep visual changes in Subframe and re-sync; keep application behavior in code. If a required component or token is missing from Subframe, use design to add it there, then bring it into code. Do not hand-roll a look-alike or patch generated styles.
- **The codebase owns the theme and components.** An established library such as MUI, shadcn, or custom components, with no Subframe sync, establishes this model. Treat the Subframe page as a visual reference. Implement with the app's components and tokens; translate styling to their equivalents instead of pasting Tailwind classes that bypass them. Do not initialize or sync Subframe unless the user chooses to adopt it. Use import when asked to bring the code's system into Subframe so future designs use it faithfully.
- **Mixed or unclear.** Name both models and the evidence for each, including any project mismatch. Follow an established boundary for the target screen. Ask only when the unresolved choice changes which components, theme, or files you will use.

Read [setup.md](setup.md) only when the app has no Subframe setup and the user wants Subframe's components, or init/sync fails.

## Get code with fewest tokens

Fetch get_page_info once for the page being implemented and inspect screenshot_page. Use files[].fileName and files[].contents as the page source. Keep the clean export defaults; node IDs and editor metadata are unnecessary for implementation. Page imports follow the project's export settings, normally its configured import alias; resolve them against the local setup.

In the Subframe model, use CLI sync for missing components and init for theme files: they write code directly to disk without passing it through context. Read only the local component APIs needed for implementation. Do not fetch every component with get_component_info to obtain code already available through sync.

Sync missing components by name, for example `npx @subframe/cli@latest sync Button Alert`. Never automatically re-sync components already present; refresh them only for a requested design update. Avoid routine sync --all or a bare sync, which also syncs everything. Named sync includes dependencies; inspect those changes too.

## Turn page code into app code

Place the implementation in the app's route and layout structure. Reuse its shell, routing, and server/client conventions.

- Match component variants and prop types to the intended states. Inspect local types and existing usages; map to equivalent APIs in the codebase model.
- Fill slots through their declared props or children, preserving compound component structure. Put page composition around components; do not edit generated internals to insert content.
- Follow local icon imports and prop types. In the Subframe model, create a missing page-only uploaded icon module from get_icon_info; do not sync the whole library for it. In the codebase model, use the app's icon library and asset conventions.
- Resolve image URLs and assets through the app's asset pipeline. Preserve crop, aspect ratio, and meaningful alt text; verify assets load.
- Replace placeholder copy and repeated JSX with real data and mapped items with stable keys. Use existing data fetching and formatting conventions; identify unavailable data instead of inventing a backend.

In the Subframe model, leave generated component files untouched. Put custom component logic in index.tsx and mark that wrapper with `// @subframe/sync-disable`. Keep the generated component available for visual updates. Merge changes manually into already disabled files.

## Implement behavior

Wire navigation, forms, validation, selection, dialogs, and loading, empty, and error states through the app's existing patterns. A static page export does not establish runtime behavior.

If the user points to a Subframe prototype for the intended behavior, read only its relevant files with read_prototype_file and translate that behavior; the prototype is a separate scaffold with mock data, not necessarily code to adopt.

## Verify in the app

Run the app with the host's shell and browser tools. Compare against screenshot_page at the same viewport, theme, content, and state. Check lower sections, responsive layouts, and interactions as well as the initial screen. Fix discrepancies, then run the relevant build or checks. Report what ran and any visual or behavioral verification you could not complete.

## Apply a later design change

For a requested update in the Subframe model, re-sync affected components by name. Refresh changed theme files through init with the existing configuration and component syncing disabled; sync alone does not refresh tokens. Re-fetch the page once after design changes finish. In the codebase model, translate the visual delta into the app's components and tokens.

Compare the refreshed export with a previous export when available, otherwise with the implemented JSX and screenshot. Check imports, variants, slots, layout classes, assets, and copy; inspect local component diffs.

Merge the changed regions into the existing implementation, preserving hooks, handlers, state, data bindings, and wrapper customizations. Do not replace the route with a fresh export. Repeat visual and behavioral verification.

## Explain canvas and code sync

The CLI brings Subframe components into code through sync and theme files through init. Pages are implemented or copied separately; CLI sync does not update them. Local edits do not automatically appear on the canvas, and canvas edits do not automatically update an implemented page. Re-fetch and merge a changed page when requested. Bringing code back into Subframe is an explicit design or import task, not continuous two-way sync.
