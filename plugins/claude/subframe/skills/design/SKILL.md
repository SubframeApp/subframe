---
name: design
description: Design and edit anything in Subframe — pages, components, snippets, design documents, the theme. Also handles deletion of those resources except theme. Always load this skill when taking any action through the Subframe MCP server. This includes building or iterating on UI, evolving the design system, capturing design intent in writing, or cleaning up a project. Don't write UI code directly — design first, then implement with /subframe:develop.
argument-hint: "[what to design or change]"
---

The Subframe MCP server exposes tools for the full design surface — pages, components, snippets, design documents, theme — and this skill teaches you when to reach for each one. Each tool returns a URL the user can open to see the result. The heaviest ones (`design_page`, `design_component`, `edit_component`) run as background AI jobs and also return a `jobId` — pass it to `wait_for_jobs` if you need to ensure completion.

**Don't write UI code directly.** Subframe generates production-ready React/Tailwind code that matches the design system. Design in Subframe first, then implement with `/subframe:develop`.

## When to use this skill

The user wants to:

- Build a new page or screen, or iterate on an existing one
- Add a new reusable component or snippet to the project or edit existing ones
- Capture design intent or component usage guidance as written documentation
- Update the project-wide visual theme (colors, fonts, corners, shadows, typography)
- Remove pages, components, snippets, or flows that are no longer needed

The key value: `/subframe:design` and `/subframe:develop` bridge coding and design. They work in both directions — create designs while coding and then ensure your code exactly reflects your design.

## Picking the right tool

| Intent | Tool |
| --- | --- |
| Find out what already exists in the project | `list_components`, `list_pages`, `list_snippets`, `list_flows`, `get_project_info` |
| Build a screen the user navigates to | `design_page` (new) / `edit_page` (targeted change) |
| Build a reusable building block (Button, Card, ListItem) used inside pages | `design_component` (new) / `edit_component` (targeted change) |
| Build a small example used inside a design document (e.g. a Button-variants demo) | `design_snippet` (new) / `edit_snippet` (targeted change) |
| Write or update written design / usage documentation | `write_design_document` |
| Change project-wide colors, fonts, corners, shadows, typography | `edit_theme` |
| Remove a page, flow, component, or snippet | `delete_page` / `delete_flow` / `delete_component` / `delete_snippet` |

## MCP Authentication

If you cannot find the design tools (or any Subframe MCP tools), the MCP server likely needs to be authenticated. Ask the user to authenticate the Subframe MCP server. If the user is using Claude Code or Codex, instruct them to run `/mcp` to view and authenticate their MCP servers, and then say "done" when they're finished.

## Find the projectId

Every design tool takes a `projectId`. Resolve it like this:

1. Check `.subframe/sync.json` if it exists locally.
2. If no projectId is found, call `list_projects`. Each project includes a `projectId`, `name`, `teamId`, and `teamName`.
   - **One project**: Use it automatically.
   - **Multiple projects**: Always ask the user which project to use. Present each project with its `teamName` to disambiguate. If the user already mentioned a specific team or project name, match it against the `teamName` and `name` fields — but still confirm before proceeding. Never silently pick a project when multiple exist.

## Audit what already exists

Before working on any design, get a picture of the project's current state. On any project where you don't already have explicit knowledge of what's been built, call:

- `list_components` — see which components already exist. Some projects may have pre-existing components, some may not have any components yet.
- `get_theme` — see the project's theme tokens (colors, fonts, corners, shadows, typography).
- `get_project_info` — see project-level design documents.

This audit is cheap and critical to proper project management.

### Verify theme alignment before designing

The first time you're about to call `design_page` / `design_component` / `edit_page` / `edit_component` against a given project in this conversation, follow this process:

1. **If the project has codebase context** (working in a repo, recreating a page, importing a design), locate and read the codebase's theme source — `tailwind.config.*`, theme CSS variables, a tokens module. Also read the codebase's most canonical filled component (typically `Button`) to see which token is used where — names and values can match while roles diverge.

2. **Write the comparison** — a brief alignment summary covering colors, fonts, corners, shadows, typography, **and role** (which token is used for what, on both sides). Flag mismatches even when names/values look the same. Watch specifically for:
   - **Role divergence** — e.g., the codebase's `brand` token paints focus rings only while a separate `primary` token paints filled-button backgrounds; the Subframe project's convention may have `brand-primary` painting the filled-button background instead. If you need to verify Subframe-side roles, call `get_component_info` on the relevant component to see which tokens it actually references.
   - **Dual-token systems** — shadcn-style `primary` / `primary-foreground`, `destructive` / `destructive-foreground`, etc., where each role pairs a surface token with a content token. The Subframe theme may not have direct equivalents.

3. **If anything mismatches, or `get_theme` is empty**, stop and ask the user if they would like to set up the theme via `edit_theme` first since any design call is at risk of using hardcoded values and breaking the design system source-of-truth promise. Treat this like destructive-deletion confirmation: required even under autonomy / no-clarifying-questions directives.

4. **If the codebase uses hardcoded values instead of token**, the user may be hoping to start using tokens with Subframe. Ask the user if they want to create a theme in Subframe from their hardcoded values or if they would prefer to stick with hardcoded values.

If the project has no codebase context, only the empty-theme check applies — skip the comparison.

**When roles diverge**, ask the user how they would like to proceed as far as keeping the Subframe roles versus matching their codebase ones. Based on their answer, follow the process outlined in [Risk-classify before calling](#risk-classify-before-calling) and, if necessary, [safe consolidation via alias bridging](#safe-consolidation-via-alias-bridging).

## Grounding design calls in real code

Subframe's design AI is far more accurate when the call carries raw code than when it carries paraphrase. "Make the primary darker" leaves a guess; pasting `--color-primary: oklch(0.55 0.18 250)` doesn't. Wherever the codebase already has the source — a component implementation, theme tokens, a similar page — paste it into the call instead of describing it.

**Default to pasting full files when they exist.** Under-including is generally worse than over-including. Use the format:

```
// src/components/Button.tsx
<full file content>
```

Group related files in adjacent blocks (component + stories + CSS module).

**Don't paste what the AI already has.** For `edit_component`, `edit_page`, and `edit_snippet`, the current Subframe code is already on the server — don't echo it back. Read it with `get_component_info` / `get_page_info` / `get_snippet_info` so your description can target exactly what differs. Prefer the most efficient form: plain language when the change doesn't depend on any code the AI hasn't seen ("change padding from 4 to 6, add a hover state"); otherwise reference code scaled to what's needed — a targeted diff or code snippet when the Subframe code already resembles the target, a full file when handing over a wholesale target, a sibling pattern, or related types.

**Soft cap on very large files (~500 LOC combined).** When trimming, keep verbatim:

- Prop / type / interface definitions
- JSX structure with `className` strings (and any `cva` / variant maps) intact
- All styling rules — never paraphrase styles ("subtle shadow with rounded corners" → paste `className="rounded-md shadow-sm"`)

Safe to trim:

- Business handlers, event wiring, data fetching, side effects
- Imports unrelated to structure/styling
- Test- or dev-only blocks
- Comments that aren't load-bearing

If the codebase has no source for what you're designing, describe the design from scratch rather than fabricating a reference.

### For component design (`design_component`, `edit_component`)

Include in the description:

1. **The canonical component source file** if it exists in the codebase (e.g. `src/components/Button.tsx`).
2. **The stories file** (e.g. `Button.stories.tsx` / `.mdx`) — exact variants, sizes, states, and the props that produce each.
3. **CSS modules or scoped CSS** (e.g. `Button.module.css`) if styling lives outside Tailwind classes.
4. **Prop-type files** if types are defined separately (e.g. a `types.ts`).
5. **Theme tokens the component references** — pull the relevant rows from the codebase theme (`tailwind.config.*`, CSS variables) and from `get_theme` so the AI keeps roles aligned.

### For snippet design (`design_snippet`, `edit_snippet`)

See the snippet tool sections below for `codeContext` / `references` parameter use. `edit_snippet` has no `codeContext` parameter — paste outside reference code into `description`.

### For page design (`design_page`, `edit_page`)

See [Preparing codeContext](#preparing-codecontext) below for the page-specific rule about leaving Subframe component references as-is and inlining everything else. The general grounding rules above (default to full files, paste styles verbatim, soft cap with trimming) layer on top.

### For theme edits (`edit_theme`)

See [Preparing the edit_theme description](#preparing-the-edit_theme-description) under the Theme section. The codebase theme source files belong in the description verbatim — don't paraphrase token values.

## Background jobs and `wait_for_jobs`

`design_page`, `design_component`, and `edit_component` return a `jobId` alongside their URL. The job runs in the background — the URL is live immediately and allows the user to watch the design populate.

**Surface job status to the user.** When you kick off a design, tell them you've started ("Designing your settings page in Subframe…") and present the URL. When the job finishes, tell them a relevant message like "✓ Variations are ready to review.". The user already sees live progress in the editor, but they should not have to go to the editor to know when the design is done.

**Present the URL verbatim** — don't strip query parameters. The URLs returned by `design_page`, `design_component`, and `edit_component` (and the inline-AI tools like `edit_page`) embed a conversation ID that opens the AI chat panel preloaded with the conversation that produced the design. That gives the user reasoning, intermediate steps, and a place to keep iterating with the AI directly — far more useful context than the bare resource URL.

**When to call `wait_for_jobs`:**

- **Before reading back the generated content** with `get_page_info`, `get_component_info`, `get_snippet_info`, or `get_flow_info`. The read returns empty/stale state until the job finishes.
- **Before a downstream design call that needs the new resource as context** (e.g., designing a page that should reference a component you just created).
- **Before handing off to `/subframe:develop`** if the user immediately asks to implement.

You don't need `wait_for_jobs` when you're only presenting the URL to the user and stopping there.

`wait_for_jobs` accepts multiple `jobIds` at once — batch them when you've kicked off multiple designs. Each result is `running`, `done` (with an optional summary), or `not_found`. Call in a loop until every job reads `done`. The server treats jobs that stall longer than ~10 minutes as `done` so the loop never hangs.

## Pages

### Before designing a page

When the user asks you to design, recreate, or redesign a page that uses non-trivial UI components (see [What belongs as a Subframe component](#what-belongs-as-a-subframe-component) for what counts):

1. **Run the project audit** — `list_components` (and `get_project_info` if you haven't yet).
2. **Inventory the components the page renders with their status and decision.** Output the list verbatim, even when the conclusion seems obvious
   - **Missing entirely** → `design_component`
   - **Exists but visually doesn't match the source/spec** → `edit_component` (existing components keep their identity; existing usages are updated)
   - **Exists and matches** → reference directly in the page design

   Example:

   ```
   Button: missing → design_component
   Alert: missing → design_component
   SettingsCard: missing → design_component
   ProfileMenu: exists, matches → reference
   ```
3. **Write the dependency list before any `design_component`/`edit_component` calls.** For each new or edited component in the batch, list the other components in the batch that it visually embeds. Output it verbatim, even when the list is short. For example:

   ```
   Button: deps=[]
   Alert: deps=[]
   SettingsCard: deps=[Button]  // footer holds a Save button
   ```

   Many components embed other components — a Card with an action footer holds a Button, a Form holds Text Fields, a ListItem holds an Avatar. If you skip writing the list, you will miss these.
4. **Group into waves from the dependency list, then run waves sequentially.** A component goes in Wave N if all its deps are in waves < N or already ready as-is. Kick off everything in a wave in parallel, `wait_for_jobs` on the whole wave, then start the next wave. `wait_for_jobs` on the final wave before kicking off the page, so the page design sees up-to-date components.

   Example: page needs a new `Button`, a new `Alert`, and a new `SettingsCard` (whose footer renders a Save Button).
   - Wave 1: `Button` + `Alert` in parallel → `wait_for_jobs` both.
   - Wave 2: `SettingsCard` → `wait_for_jobs`.
   - Then `design_page`.

Default to handling all the components the page renders — not just the domain-specific ones. This includes standard components like Button, Input, Alert, Card, Badge, Tabs, Toggle, etc. `design_page` does NOT have a default component library to fall back on. `list_components` is the complete list available in the project. If `design_page` needs a component that doesn't exist, it falls back to inline markup, which doesn't create a reusable component.

If you would need to create/edit more than 3 components in Subframe to design the page, ask the user if they would prefer you to handle all the components, design the page without them, or somewhere in between. When designing any number of components, always run the dependency listing in step 3.

### `design_page` — new pages and redesigns

Use `design_page` when:

- Creating a new page from scratch
- Redesigning or rethinking existing UI — if there's an existing implementation in code, use `design_page` when the user wants to explore new design directions or add new features
- Recreating an existing UI from code exactly as a starting point to design in Subframe
- The user wants options to choose from (multiple variations)

#### Context and variations

How much context to gather and how many variations to generate depends on the task:

| Task                                | Context                                                                                                                                            | Variations                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **New page (open-ended)**           | Data types (`codeContext`)                                                                                                                         | 4 — explore the design space            |
| **New page (with reference pages)** | Reference pages (`additionalPages` if in Subframe, `codeContext` if not), data types (`codeContext`)                                               | 1-2 — stay close to the reference pages |
| **Redesigning existing UI**         | The current page (`additionalPages` if in Subframe, `codeContext` if not; note what to keep vs change in the description)                          | 2-4 — depending on how open-ended       |
| **Recreating an existing UI**       | The current page's exact markup and styles (`codeContext`)                                                                                         | 1 — recreate the UI from code exactly   |

**Always include when available:**

- The existing page being discussed and similar existing pages (the single most valuable context). Use `additionalPages` for Subframe pages — pass the page ID from a pasted MCP link, or a specific variation page ID the user has referenced. Use `codeContext` for pages that only exist in the codebase.
- Components or patterns the user refers to or explicitly mentions (via `codeContext`)
- Data types/interfaces for what the page will display (via `codeContext`)

#### Preparing `codeContext`

The general "paste real code, soft cap with verbatim styling" rules in [Grounding design calls in real code](#grounding-design-calls-in-real-code) apply here too. The page-specific addition below is the Subframe-vs-non-Subframe component handling rule.

When including code in `codeContext`, distinguish between components in the Subframe project vs not (`list_components` is the source of truth):

- **References to components that already exist in the project** — leave as-is. Subframe will resolve them from the project.
- **References to components that don't exist in the project yet** — either design them first with `design_component` (see [Before designing a page](#before-designing-a-page)), or inline their rendered JSX + Tailwind classes into `codeContext`.
- **References to non-component application code** — always inline. See [What belongs as a Subframe component](#what-belongs-as-a-subframe-component) for the distinction.

When you inline a component, expand it into its JSX markup (inputs, buttons, layout, Tailwind classes). If that expanded markup has more component references, evaluate those using the same process.

#### Variations

Each variation is an object with a `name` (short name) and `description` (a few sentence prompt describing the design direction).

**When you have reference pages** (`additionalPages`), use fewer variations (1-2) and keep them grounded in the reference. The variations should refine or extend the existing design, not diverge from it. For example:

- `{ "name": "Adapted layout", "description": "Follow the same layout as the reference page but adapted for [new content]" }`
- `{ "name": "Compact data-dense", "description": "Same structure as the reference but with a more compact, data-dense layout." }`

**When starting from scratch** (no `additionalPages`), use more variations (4) to explore the design space:

- `{ "name": "Data table", "description": "Compact data table with inline actions and bulk operations." }`
- `{ "name": "Card grid", "description": "Card-based layout with visual hierarchy and quick filters." }`
- `{ "name": "Minimal single-column", "description": "Minimal single-column design focused on the primary action." }`
- `{ "name": "Split panel", "description": "Split-panel layout with sidebar navigation and detail view." }`

More variations = more exploration. Fewer = more focused. Default to fewer when strong context exists.

#### Multi-page requests

When designing multiple related pages (flows, CRUD, etc.):

1. Design the primary page first with more variations to establish the direction.
2. After the user has reviewed the variations in the flow editor, design remaining pages passing the relevant variation page(s) via `additionalPages`. Have the user paste an MCP link to the variation they want as reference, or use `get_flow_info` with the `flowId` to enumerate the pages in the flow and ask which to use.
3. Use the same `flowName` to group related pages together.

### `edit_page` — targeted edits to an existing page

Use `edit_page` for targeted changes to a specific Subframe page. Pass `id`, `name`, or `url` (call `list_pages` first if you need to find it) plus a `description` of the change. Follow the [Grounding](#grounding-design-calls-in-real-code) rules — the AI already has the current page code, so only paste outside reference code when the change depends on something the AI can't see. The edit applies immediately; present the returned `pageUrl` to the user.

#### When to use `edit_page` vs `design_page`

- **`edit_page`**: Targeted changes to an existing Subframe page. Fast and precise.
- **`design_page`**: New pages, redesigns, or exploring multiple design directions.

**When NOT to use `edit_page`:** If the user has existing UI in their codebase but no corresponding Subframe page, or if they want to explore multiple design options, use `design_page` instead.

### After a page design

For `design_page`, present the returned `flowUrl` as a clickable markdown link. The flow opens immediately; each variation appears as a new page on the canvas as it finishes generating. The user reviews them side-by-side on the flow canvas and may keep multiple, edit them, delete some, or just leave them all there — there's no formal "pick one" step.

From there, the user may continue refining in Subframe or return here and ask you to implement the design in code. Do NOT ask the user which variation they prefer or present variation options as a multiple choice in chat. Simply present the flow URL and let them know they can ask you to implement once they're ready.

If you need to enumerate the variation pages programmatically (e.g., to reference one in `additionalPages` or to read its current code with `get_page_info`), call `wait_for_jobs` with the `jobId` first, then `get_flow_info` with the `flowId`. Reading too early may return only the variations that have finished by that moment.

Internally track the `flowId` returned by `design_page`. Don't surface it to the user. Use it with `get_flow_info` for follow-up flow-level operations, or pass the same `flowName` on subsequent `design_page` calls to keep new variations grouped in the same flow.

For `/subframe:develop`, `additionalPages`, or `edit_page`, use specific page IDs the user has referenced (via pasted MCP link or while iterating in the editor), or call `get_flow_info` to look them up by name — `design_page` itself doesn't return individual page IDs since all variations land as separate pages on the canvas.

## Components

Components are reusable UI building blocks (Button, Card, ListItem, Toggle, etc.) that get used inside pages. They live at the project level and sync into the codebase via `npx @subframe/cli sync`. Designing a component creates a new entry in the project's component library. Editing one updates every page that uses it.

### What belongs as a Subframe component

Subframe components are **visual/presentational primitives** — the reusable UI building blocks that get composed into pages. Be deliberate about what gets promoted to a component vs. what stays inline in a page.

**Make it a component if it:**
- Renders pure UI: buttons, inputs, cards, modals, badges, alerts, list items, layout primitives (containers, stacks, grids), etc.
- Will be reused across multiple pages, or has variants worth defining once

**Keep it inline (in the page, not a component) if it:**
- Fetches data, calls APIs, or manages application state
- Wires together business logic (form submission handlers, validation flows, page-level orchestration)
- Is a one-off composition specific to a single page
- Is utility code (hooks, helpers, non-visual modules) — those don't belong in Subframe at all

When unsure, quickly read the source. If it imports data-fetching libraries, stores, or API clients, it's application code — keep it in the page.

### `design_component` — add a new component

Use `design_component` to create something that should be a Subframe component (see [What belongs as a Subframe component](#what-belongs-as-a-subframe-component)). Pass:

- `description` — what the component is and how it should look/behave. **Paste real code, don't paraphrase** — see [Grounding design calls in real code](#grounding-design-calls-in-real-code) for what to include (canonical source, stories, CSS modules, prop types, relevant theme tokens) and verbosity rules. Apply the Subframe-vs-application rule from [Preparing codeContext](#preparing-codecontext): leave references to components that already exist in this Subframe project as-is, inline anything else.
- `name` — the component name (PascalCase, e.g., "PrivacyToggle")
- `projectId` — usually inferred from `.subframe/sync.json`

Returns `componentId` (immediately referenceable in other tools), `componentUrl` (open this in the editor to watch the design happen), and `jobId` (pass to `wait_for_jobs` before reading back via `get_component_info` or referencing in another design call).

### `edit_component` — change an existing component

Use `edit_component` for targeted changes to a component already in the project. Call `get_component_info` first so your description can target exactly what differs. The design AI already has the current Subframe code — only paste outside reference code when the change depends on something the AI can't see (a codebase implementation to match, a sibling component, a design spec). See [Grounding design calls in real code](#grounding-design-calls-in-real-code) for what to include and how to trim.

Pass one of `id`, `name`, or `url` plus a `description`. Returns `componentUrl` and `jobId`. Edits propagate to every page using the component, so confirm with the user before making structural changes.

The same component cannot be edited by two agents simultaneously — if another conversation is already working on it, the tool returns the in-progress URL and you should wait or ask the user.

**Note:** AI editing is not supported for page layouts. To modify a layout, the user must open it in the Subframe editor directly.

**Use `edit_component` to align existing components with a codebase or spec.** If a project component doesn't match the user's source code or design references, that's an `edit_component` job — don't design a parallel one. If it's unclear whether the edits apply cleanly to existing usages, confirm with the user before editing.

## Snippets

Snippets are small, standalone bits of UI typically embedded inside design documents as live examples — for instance, a "Button variants" snippet showing every Button state side-by-side, embedded in the Button's usage doc. They can be inserted into any design but are detached whenever inserted, so changes to a snippet do not propagate to other designs. They're not synced into code as components.

### `design_snippet` — create a new snippet

Use `design_snippet` when the user wants to illustrate something in a design document, or wants a small standalone composition that doesn't need to be represented as a component. Pass:

- `description` — what to show
- `name` — optional; defaults to "AI Generated Snippet"
- `codeContext` (optional) — raw outside code that grounds the snippet (the codebase implementation it should mirror, related types, the specific usage example it illustrates).
- `references` (optional) — IDs or names of existing Subframe components, pages, or snippets to use as design context (resolved server-side, no need to inline their code).

Returns `snippetId` and `snippetUrl`. Embed the snippet in a design document with `<div data-type="component-example" data-component-id="<snippetId>"></div>` (see the design documents section).

### `edit_snippet` — change an existing snippet

Same shape as `edit_component` but for snippets. Use when the embedded example needs to evolve alongside the component it documents.

## Design documents

Design documents are markdown files that convey how to work within your design system — brand voice, design principles, component usage rules, accessibility requirements, do/don't examples. They're read by you (and other AI agents) when designing or implementing. There are two kinds:

- **Project-scoped docs** — cover broad guidance like design principles, project-wide conventions, onboarding notes. A project can have many.
- **Component-scoped docs** — attached directly to a specific component; cover specifics for that component like "when to use this" and do/don't examples. **A component can have at most one design document.**

Use design documents when:

- The user explicitly asks for one ("write a design doc for the Toggle component")
- There is complexity in using the design system that needs to be documented for future designs
- The user's repo has existing design guidelines that should be migrated to Subframe
- A component needs usage guidance, accessibility notes, or do/don't examples

Read existing docs first via `get_project_info` (returns project-level `docs`) or `get_component_info` (returns the component's `designDocuments`). If a component already has a doc, you must update it (don't try to create a second one); pass the existing `id` to `write_design_document`.

### What belongs in a design document

Design documents are for **design judgment that Subframe's structured data can't carry**. They should be concise and contain information that is unobvious to a consumer of the design system. The Subframe design AI already has access to:

- **Component code** (props, JSX, styles)
- **The theme** (colors, fonts, corners, shadows, typography tokens)

Restating any of that in a doc is wasted space. Reach instead for the layer above: when to use what, how to compose, what it should say, what to avoid.

**Belongs in a design doc:**
- Usage hierarchy and taxonomy
- Variant meaning — what each variant communicates to the user
- Sizing rules
- Labeling rules
- Composition patterns and accessibility notes
- Theme conventions — when to use the existing theme tokens, e.g. use brand color here but neutral there
- Do's and don'ts framed as design judgment

**Does NOT belong in a design doc:**
- Prop tables or API documentation — the design AI reads the component code already
- Theme token values (hex codes, pixel spacing, shadow definitions, radius values) — the theme already holds these. If the project's theme is wrong or empty, fix the theme via `edit_theme`; don't paper over it in a doc.
- Inline JSX or Tailwind class examples — these should be embedded snippets instead
- Common design standards — if any designer would follow a pattern by default, don't restate it. Only document practices unique to this design system. When a common standard does hold particular importance, write the project-specific angle ("Confirm before destructive actions — restate the noun in the dialog, e.g. 'Delete survey' not 'Are you sure?'"), not the standard itself.
- Anything trivially derivable from the component source or the theme


### `write_design_document`

Inputs:

- `content` — markdown
- `id` (optional) — if editing an existing doc; omit to create a new one
- `componentId` (optional) — if creating a new component-scoped doc
- `title` (optional) — for project-scoped docs only; ignored for component-scoped
- `mode` (optional) — `replace` (default) overwrites, `append` adds the new content after existing

Embed snippet examples with HTML:

```html
<div data-type="component-example" data-component-id="<snippetId>"></div>
```

Preserve these tags verbatim when round-tripping through `mode: replace` — losing them removes the embed.

## Theme

Use `edit_theme` to update the project's visual theme — colors, fonts, corners, shadows, typography tokens. **Applies immediately to the whole project; there's no preview step.** Always use `get_theme` first to see the current state before formulating changes.

### What `edit_theme` can do

- **Add** new tokens
- **Tweak values** on existing tokens ("make the primary darker," "increase border radius")
- **Rename** tokens — safe. Components and pages reference tokens by id, so the alias survives the rename.
- **Delete** tokens — **destructive**. Every page/component that referenced the deleted token gets its alias replaced with the token's concrete value at deletion time. Those usages are now detached (hardcoded), not tracking any token. Theme version history restores the token, but the detached references stay detached — full recovery requires project version history.

### Preparing the `edit_theme` description

When the project has codebase context, the description should carry the **actual theme source files verbatim**, not paraphrased token values. Include every token — do not drop tokens that seem unrelated to the immediate task. The theme is project-wide; what you are about to design isn't the only consumer. Look for:

- `tailwind.config.*` (often `tailwind.config.ts` or `.js`)
- Global CSS files with `@theme` blocks (Tailwind v4) or `:root { --color-... }` declarations — `globals.css`, `app.css`, `index.css`
- Token modules (`tokens.ts`, `tokens.json`, `theme.ts`, Style Dictionary exports)
- Font config (`next/font`, CSS `@font-face`, font import URLs)

Paste each file in a fenced block headed by its path (`// tailwind.config.ts`). Don't summarize token values — the AI's accuracy on color, spacing, and typography depends on the exact strings.

**Only let the design AI invent tokens when there is genuinely no codebase theme source.** In that case, say so explicitly in the description.

### Risk-classify before calling

Read the user's prompt and classify before invoking:

| Risk | Operations | Action |
| --- | --- | --- |
| Low | Adding tokens, tweaking values | Call directly; mention what changed after |
| Medium | Renaming tokens, broad multi-token tweaks | Briefly note the scope (whole project) and call |
| High | Anything that deletes tokens, replaces the palette wholesale, or implies "remove / strip / replace existing X" | **Confirm with the user before calling.** Spell out what will be deleted and that pages/components using those tokens will be updated to use hardcoded values (which would then require project version history to undo). |

When in doubt about the risk of a prompt, assume High risk and confirm.

### Safe consolidation via alias bridging

When the user wants to consolidate tokens (e.g., `brand-50` through `brand-900` → `brand-primary` / `brand-secondary` / `brand-tertiary`), use alias bridging to avoid the destructive-delete cascade for tokens that map cleanly to the new structure. The process takes **two sequential `edit_theme` calls** (can't be combined into one):

1. **First call** — create the new tokens AND re-point each mappable old token as an alias of its matching new token. Example: create `brand-primary` with the desired color, and update `brand-200` to alias `brand-primary` in the same call.
2. **Second call** — delete the old tokens. Because references in pages/components resolve through the alias to the new tokens, they stay attached — no hardcoded fallback.

**When alias bridging doesn't apply**: some old tokens won't map cleanly to any new one (e.g., `brand-50` is too pale to belong to any of primary/secondary/tertiary). For those, the standard destructive-delete cascade applies — references become hardcoded values. Make a per-token call: bridge what you can, accept detachment (and confirm with the user) for what you can't.

### When NOT to use `edit_theme`

- **Single-page styling change** — if the user wants different styling on just one page, not the project-wide theme, use `edit_page` instead.

## Deletion

Four tools, one per resource type. **Always confirm with the user before calling any delete tool** — these are irreversible from MCP (the Subframe editor retains version history for restore, but recovery is manual and may require reverting changes that occurred after).

- `delete_page({ id|name|url, projectId, force? })` — deletes a page, removing it from its flow and stripping prototype actions referencing it. Refuses by default if referenced in other pages. Use `force: true` to delete anyway. Page layouts can't be deleted with this tool — use `delete_component` (it cascades to clear `pageOptions.layout` on every page using the layout).
- `delete_component({ id|name|url, projectId, force? })` — deletes a component or page layout. Detaches instances or clears layouts. Refuses by default if in use. Use `force: true` to delete anyway.
- `delete_snippet({ id|name|url, projectId })` — deletes a snippet. Any design document embeds are removed automatically.
- `delete_flow({ id|name|url, projectId, deleteChildPages? })` — deletes a flow. Refuses if it contains pages. Use `deleteChildPages: true` to delete the flow plus every page inside it.

When a delete tool refuses because of references, surface what it would affect to the user before retrying with `force: true` / `deleteChildPages: true`. Don't auto-escalate to force-mode without confirmation.

## Iterating

The user reviews and refines designs in the Subframe editor, not in code. When they come back asking to combine ideas, refine a specific direction, or iterate further:

- **They reference a specific variation** (by pasted MCP link, by name, or by describing it). If you need to find the variation's `pageId`, call `get_flow_info` with the `flowId` from the original `design_page` response — it returns the pages in the flow with names and IDs. Then use `edit_page` with that page's id for targeted changes, or call `design_page` with the page passed via `additionalPages` if they want a fresh set of options grounded in that direction.
- **They want to mix variations** ("I like the layout from variation 1 but the colors from variation 3"). Ask them to paste the MCP links of the variations they want to combine (or use `get_flow_info` to look up page IDs by name), then call `design_page` with those pages via `additionalPages` and a description of the combination.
- **They want to start over** ("none of these are right"). Call `design_page` again with a refined description and any reference pages via `additionalPages`. Use the same `flowName` to keep related work grouped.
- **They want to iterate on a component or snippet**. Use `edit_component` / `edit_snippet` for targeted changes; the resource keeps its identity and existing usages stay wired up.

You don't have to read the generated code by default — Subframe renders the designs and the user reviews them visually in the editor, so summarizing them in chat usually isn't useful. When reading the code would genuinely help (the user asks what was generated, you're picking which design to extend, etc.), call `wait_for_jobs` if necessary and then the required `get_*_info` calls.
