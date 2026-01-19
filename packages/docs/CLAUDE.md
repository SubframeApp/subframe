# Subframe documentation

## Working relationship

- You can push back on ideas-this can lead to better documentation. Cite sources and explain your reasoning when you do so
- ALWAYS ask for clarification rather than making assumptions
- NEVER lie, guess, or make up information

## Project context

- Format: MDX files with YAML frontmatter
- Config: docs.json for navigation, theme, settings
- Components: Mintlify components

## Content strategy

- Document just enough for user success - not too much, not too little
- Prioritize accuracy and usability of information
- Make content evergreen when possible
- Search for existing information before adding new content. Avoid duplication unless it is done for a strategic reason
- Check existing patterns for consistency
- Start by making the smallest reasonable changes

## docs.json

- Refer to the [docs.json schema](https://mintlify.com/docs.json) when building the docs.json file and site navigation
- The directory structure should mirror that of docs.json

## Frontmatter requirements for pages

- title: Clear, descriptive page title
- description: Concise summary for SEO/navigation

## Writing standards

- Second-person voice ("you")
- Use present tense (e.g. "Update" instead of "Updating")
- Prerequisites at start of procedural content
- Test all code examples before publishing
- Match style and formatting of existing pages
- Include both basic and advanced use cases
- Language tags on all code blocks
- Alt text on all images
- Relative paths for internal links
- If you can link to a page directly, always do so. Users prefer to click to get to where they need.
- For external links, add this icon after text if it helps with clarity: <Icon className="mb-1" size={12} icon="arrow-up-right-from-square" />

## Conventions

- Bold anything labelled in the UI, e.g. "Click on the **Back** button"
- Use chevrons > to indicate nested content, e.g. "Navigate to **Components > Button**"
- Individual keys in a keyboard shortcut should use a `<kbd>` tag with spaces around the plus sign, like <kbd>Cmd</kbd> + <kbd>S</kbd>
- When mentioning clickable icons (like icon buttons), use the `<Icon>` component with size 16, e.g. `<Icon icon="plus" size={16} />`
- Use H2 for section headers. Use H4 for subsection headers.
- Add images / videos below relevant headers, not above. Additional explanations or instructions should go below the image / video.

## Verbage

- Prefer "click" over "press", "tap" or phrases like "choose this option"
- Prefer "select" over "click" when clicking within menus, like "Click `...` and select Delete"
- Prefer "press" for keyboard events, such as "press <kbd>S</kbd> to save"
- Prefer "navigate to" when instructing users to navigate to another page

## Product-specific

- When instructing users to insert elements, use the phrase "Open the [quick insert](/learn/design-mode/adding-elements) <Icon icon="plus" size={16} /> menu"
- When talking about right-clicking an element and selecting an action, use two steps:
  1. "Right-click or press <kbd>/</kbd> to open [quick actions](/learn/design-mode/quick-actions)"
  2. "Select **Action**"

## Git workflow

- NEVER use --no-verify when committing
- Ask how to handle uncommitted changes before starting
- Create a new branch when no clear branch exists for changes
- Commit frequently throughout development
- NEVER skip or disable pre-commit hooks

## Do not

- Skip frontmatter on any MDX file
- Use absolute URLs for internal links
- Include untested code examples
- Make assumptions - always ask for clarification

## Code snippets

**FAQs** – FAQ sections should use AccordionGroup and Accordion components:

```mdx
## FAQ

<AccordionGroup>
  <Accordion title="Why is X not working?">Answer to the question.</Accordion>
  <Accordion title="How do I do Y?">Steps or explanation.</Accordion>
</AccordionGroup>
```
