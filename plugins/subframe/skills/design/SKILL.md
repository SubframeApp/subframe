---
name: design
description: Create or edit pages, components, snippets, design documents, and themes in Subframe, or explore and compare UI design options in Subframe.
argument-hint: "[what to design or change in Subframe]"
---

Use this workflow when the deliverable belongs in Subframe. For implementation, use develop; for bringing an existing design system into Subframe, use import.

## Why and when to use Subframe

**Why Subframe.** Give designs a persistent home outside a code branch so teammates can find, review, and revisit them. Compare variations and multi-screen flows side by side on a canvas. Gather teammate comments before code changes. Record decisions and rationale in design documents beside the design. When Subframe is the source of truth, sync code from its theme and components.

**When to use it:** Explore directions, compare options, seek review or a shareable artifact, or change several screens or the design system.

**When not to:** For small fixes to existing UI or code-only behaviour, work directly in code unless the user requests Subframe or the project keeps designs there.

## Steps

1. Identify what must stay and what should change. For an existing design, read its actual content and inspect its rendered appearance. For a website or codebase reference, use the host's browsing or file tools to collect the relevant source and screenshots. A prose description alone is weak evidence for recreating an existing UI.
2. Choose the smallest operation that delivers the request. Edit an existing page or snippet in place; duplicate for an exact copy. Write a new page yourself with create_page and edit_page, which is free and shows on the canvas as you go. Use design_page only when the user asks for Subframe's AI to generate pages in the background; it spends AI credits. Decide whether a reusable component, a page composition, a usage example, or written guidance is the intended output.
3. Gather references before writing. Read the actual source, images, or Subframe resources, and work out what to preserve and what to change. When you do use a generation tool, pass those references with a usage note, including child components and styles the source depends on: the generator does not see your conversation or reasoning.
4. Complete dependencies before their consumers. If a page needs missing reusable primitives, create those with design_component first. Finish independent primitives before components that embed them, then write the page. Keep one-off page compositions inline. Do not turn recreating a page into an unsolicited component-library rebuild.
5. Complete the requested screens and edits, then review what landed. Compare screenshots with the reference and requested change, including lower sections, affected responsive layouts, and relevant states. Fix missing content, clipping, spacing, and typography discrepancies before reporting.

## Pages and flows

Read what you need first, including get_design_guidance once per session. Then call create_page and immediately add content with edit_page, one visual group per call, starting on the rootNodeId it returns. The user watches the canvas in real time, so small writes show progress and large ones look like nothing is happening.

Make one page unless the user asks for alternatives. Keep alternatives to the same screen, each beside the first, and make them genuinely different in layout or emphasis.

Build a flow's screens in order, each beside the previous one, reusing shared chrome from the previous page's code. Do not wait for the user's pick between screens.

Use design_page when the user asks for Subframe's AI to generate pages. Make each variation's brief self-contained, split requested variations across calls on the same canvas if needed, and after wait_for_jobs verify the page exists before building on it.

## Existing designs

Use update_node_styles for styling and edit_page or edit_snippet for content or structure. Start from the existing classes and subtree so unrelated layout, children, and copy survive. On replacement, keep data-node-id on retained nodes; omit IDs on new or inserted nodes. After a stale-ID error, reread the affected resource and reconstruct the edit instead of retrying old markup.

Use edit_component when the requested change belongs to the shared component. Inspect representative usages to understand the effect. A page-specific adjustment belongs on that page's instance or composition.

For comment-driven edits, match each requested thread to its current element and track which feedback was addressed. A thread whose element disappeared needs interpretation, not an edit against its old ID.

## Theme and design guidance

For a restyle, update existing tokens so current designs inherit the intended look. Preserve semantic roles and aliases instead of creating parallel look-alike tokens. Check representative pages and components in the affected modes. Prepare concrete token mappings before requesting any confirmation required for deletions or replacements. Use import for adopting an external token source.

Write design documents for decisions a future designer cannot infer from the UI: when to use a pattern, content constraints, and product-specific exceptions. Update existing guidance and preserve embedded examples. Use design_snippet for reusable examples or compositions that do not need a component API; do not manufacture documents or examples for every page.

## Review and recovery

Use screenshot_page for changed pages and screenshot_component for changed components after jobs finish. For a snippet, inspect it in an existing page usage when available; do not create an extra page just for verification. Disclose any missing visual coverage.

Read parser warnings and applied results before treating an edit as successful. If content was dropped or normalized away, express the intended static design more directly. A masked “Something went wrong” error is not evidence that nothing changed: inspect the destination and job state before retrying a creation. Retry only missing work, and report a persistent failure with the affected resource and any returned job ID.

Call finish_working once when you finish a task that read or changed a project, before your final reply, so collaborators with it open see you have finished.
