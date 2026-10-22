---
name: import
description: Import an existing codebase's or website's design system into Subframe, including theme tokens, light and dark modes, fonts, icons, and reusable components.
argument-hint: "[codebase, website, or design-system source to import]"
---

Use this workflow to reproduce an existing visual system in Subframe. Use design for a single page recreation, and develop for moving a Subframe design into code.

## Steps

1. Inventory the requested source before importing. Read Tailwind configuration, global CSS, token modules, font declarations, icon assets, reusable components, and their usage examples. For a website, use the host's browsing tools to inspect rendered states and accessible styles and assets. A screenshot alone cannot establish the complete token system or component library; distinguish observed values from inferred ones.
2. Compare that inventory with the destination theme, fonts, icons, and components. Keep a mapping from source names to Subframe names and IDs. Define the total requested inventory before starting so progress can be reported as N of M, not “a few components.” If the source is only partly accessible, state that the inventory is incomplete.
3. Import required fonts before the theme and required icons before components. When components are requested, recreate them in dependency order after their visual foundations are available. Validate one representative component early to catch systematic translation errors, then continue through the full requested inventory.
4. Compare imported results against the source. Check light and dark appearances, typography, dimensions, icon shapes, and the requested variants and states. Fix discrepancies before expanding a flawed pattern across the library.
5. Report counts separately for tokens, fonts, icons, and components, with source-to-destination mappings where names changed. List failures, unsupported details, approximations, and remaining items. Continue through the requested scope unless blocked; a successful first batch is not a completed library import.

## Fonts and icons

Match source font families, weights, and styles against list_fonts before uploading. Stage missing files with create_asset_upload, upload through the host's file/network tools, then add_fonts or add_icons. Keep the upload results associated with the inventory so a failed file is not counted as imported.

Extract SVG artwork from icon components or sprites when necessary. Choose recolorable icons for UI glyphs and preserve authored colors for brand artwork. Inspect artwork that uses unsupported SVG features before import; simplify it only if the appearance survives, otherwise report the limitation. Compare the stored result through get_icon_info when fidelity is uncertain.

Resolve name collisions deliberately. Reuse an identical destination asset; choose a distinct name for different artwork unless replacing the existing asset is intended. Carry the returned import names into component references rather than assuming filenames become exact names.

## Theme mapping

Keep a record of source token names, aliases, groups, and mode values. Preserve semantic relationships instead of sampling a few visible colors. Import the whole requested token set, including tokens not visible on the reference screen.

Pass supported Tailwind CSS or configuration source to import_theme unchanged. Use a dry run to inspect the mapping and skipped declarations before applying it. For other formats, translate the inventory into supported source or edit_theme operations while retaining the source mapping. Do not redesign values to fit a preferred palette or type scale.

Resolve missing fonts before reimporting typography. Read every skipped declaration: unsupported spacing tokens, unresolved values, and missing fonts are gaps to account for, not successful imports. Retain unsupported measurements in component styling where possible and report that they are not editable theme tokens.

Map light values to base values and dark values to dark overrides, enabling dark mode before writing overrides with edit_theme. Check aliases in both modes. Do not flatten dark values into the base palette or confuse a separate brand theme with dark mode.

For multiple source themes, inspect list_themes and map each to an explicit destination. Shared token identities must have consistent meanings across themes. Preserve color grouping where supported; report other collection/group structures that cannot be represented directly. Read back each affected theme with get_theme to compare values, aliases, and dark overrides. Keep existing token references attached when merging equivalent roles; prepare a concrete mapping for confirmation before deleting or replacing tokens.

## Components

Read the implementation, styles, dependencies, and representative usages of each component. Pass source code to design_component as a code reference with instructions to preserve its visual structure, variants, slots, and state styling. Include a rendered reference when available; code with unresolved imports alone is insufficient.

Build primitives before composites. Use newly imported Subframe components in later references and briefs. If a matching destination component already exists, compare it first and use edit_component for an intended update rather than creating another copy.

Recreate the visual contract, not runtime logic: API calls and application state remain in the source app. Express visual states as component variants or examples. Keep missing behavior or unsupported styling visible in the import report instead of claiming a lossless conversion.

After wait_for_jobs completes, read back each component and inspect screenshot_component. Check representative existing page usages with screenshot_page when the import changes shared assets or tokens. Count a component as imported only when it exists; separately identify anything that could not be visually verified. After an ambiguous failure, inspect the destination before retrying to avoid duplicates.
