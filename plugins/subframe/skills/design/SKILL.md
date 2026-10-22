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
2. Choose the smallest operation that delivers the request. Edit an existing page or snippet in place; duplicate for an exact copy. Use generation for a new design or a substantially different direction. Decide whether a reusable component, a page composition, a usage example, or written guidance is the intended output.
3. Prepare references before generating. Pass actual source, images, or Subframe resources with a usage note explaining what to preserve and what to change. Include relevant child components and styles when source code depends on them. Put these instructions in the generation brief; the generator does not see your conversation or reasoning.
4. Complete dependencies before their consumers. If a page needs missing reusable primitives, create those with design_component first. Finish independent primitives before components that embed them, then generate the page. Keep one-off page compositions inline. Do not turn recreating a page into an unsolicited component-library rebuild.
5. Complete the requested screens and edits, then review what landed. Compare screenshots with the reference and requested change, including lower sections, affected responsive layouts, and relevant states. Fix missing content, clipping, spacing, and typography discrepancies before reporting.

## Pages and flows

Make each variation's brief self-contained. Describe concrete differences in layout or emphasis; do not tell one variation to copy another. If the user requests more variations than one call permits, split the requested count across calls on the same canvas.

For a flow, establish the first screen's shared shell. Once wait_for_jobs reports it done, verify that the page actually exists and use its ID as sourcePageId for the next screen immediately. If several alternatives landed, select a coherent starting direction yourself and say which you carried forward. Preserve navigation and layout while specifying the next screen's differences. Do not wait for the user's pick.

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

When you start a design job, share its clickable link so the user can watch it generate. Finish your reply with clickable links to every Subframe page or component you created or changed, using URLs from tool results verbatim.
