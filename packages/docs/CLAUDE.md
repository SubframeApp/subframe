# Subframe documentation

## Working relationship

- Push back on ideas when needed—cite sources and explain your reasoning
- ALWAYS ask for clarification rather than making assumptions
- NEVER lie, guess, or make up information
- Verify features against the actual codebase before documenting

## Project context

- Format: MDX files with YAML frontmatter
- Config: docs.json for navigation, theme, settings
- Components: Mintlify components (Note, Warning, Tip, CodeGroup, Tabs, Steps, Frame, Accordion, etc.)
- Directory structure mirrors docs.json navigation

## Core philosophy

Subframe serves designers and engineers simultaneously. Documentation must be:

- **Concise**: Short explanations for concepts
- **Action-oriented**: Focus on what users do, not abstract theory
- **Accurate**: Verify every feature against codebase implementation
- **Practical**: Use realistic examples, never generic placeholders

## Content strategy

**Utility-first documentation:**
- Open immediately with solutions, not preamble
- End when problem-solving completes, no forced conclusions
- Document just enough for user success—not too much, not too little

**Task-oriented content:**
- Most articles enable a specific outcome with verb-based titles
- Prioritize "What can I accomplish?" over "What is this feature?"
- Introductions state the outcome or use cases

**Evergreen and consistent:**
- Make content evergreen when possible
- Search for existing information before adding new content
- Check existing patterns for consistency
- Start by making the smallest reasonable changes

## Writing standards

### Voice and tone

- Second-person ("you"), present tense, active voice
- Professional yet approachable
- Write for scanning, not reading

**Active voice over passive:**
```markdown
✓ You can add properties in the Inspector panel
✓ Click **Export** to copy the code

✗ Properties can be added in the Inspector panel
✗ Users can click Export to copy code
```

### Article structure

**Heading structure:**
- H2 (##): Main section headers (3-5 per article)
- H3 (###): Subsection headers (use sparingly)
- No deeper nesting (avoid H4+)

**Frontmatter (required):**
```yaml
---
title: Clear, descriptive page title
description: Concise summary for SEO/navigation
---
```

**Instructions:**
- Imperative voice: "Click," "Select," "Drag," "Type"
- Numbered steps for sequences
- Bold clickable UI elements: "Click **Apply**"
- Prerequisites at start of procedural content

**Introductions and conclusions:**
- Open with immediate value statement or use cases
- No preambles or historical context
- End when information completes—no forced conclusions

## Formatting conventions

**UI elements—always bold:**
```markdown
✓ Click the **Export** button
✓ Navigate to **Components > Button**
✓ Select **Create component** from the menu
```

**Keyboard shortcuts—use `<kbd>` tags:**
```markdown
✓ Press <kbd>Cmd</kbd> + <kbd>K</kbd>
✓ <kbd>Shift</kbd> + click to select multiple
```

**Icons in text:**
```markdown
✓ Open the [quick insert](/learn/design-mode/adding-elements) <Icon icon="plus" size={16} /> menu
```

**Code blocks—always include:**
- Language tags
- File names when relevant
- Full, tested examples

## Mintlify components

**Frame—for images and videos:**
```mdx
<Frame caption="Optional caption">
  <img src="/images/path.png" alt="Descriptive alt text" />
</Frame>
```

**Videos:**
```mdx
<video autoPlay muted loop playsInline className="w-full" src="url.mp4" />
```

**Steps—for procedures:**
```mdx
<Steps>
  <Step title="First step">Content here</Step>
  <Step title="Second step">More content</Step>
</Steps>
```

**CodeGroup—for package manager variations:**
```mdx
<CodeGroup>
```bash npm
npx @subframe/cli@latest sync
```

```bash yarn
yarn dlx @subframe/cli@latest sync
```
</CodeGroup>
```

**Tabs—for alternative content:**
```mdx
<Tabs>
  <Tab title="New project">Content for new projects</Tab>
  <Tab title="Existing project">Content for existing</Tab>
</Tabs>
```

**Accordions—for FAQs and troubleshooting:**
```mdx
<AccordionGroup>
  <Accordion title="Why is X not working?">Answer content.</Accordion>
  <Accordion title="How do I do Y?">Steps or explanation.</Accordion>
</AccordionGroup>
```

**Callouts—use sparingly (1-2 per article):**
```mdx
<Tip>Efficiency shortcuts, best practices</Tip>
<Note>Important context, limitations</Note>
<Warning>Destructive actions or common errors</Warning>
```

## Visual content

**Image alt text requirements:**
- Describe the specific UI state or screen
- Include key UI elements visible
- Provide enough detail to understand the content

**Example:**
```markdown
<Frame>
  <img src="/images/editor/inspector.png" alt="The Inspector panel showing padding and margin controls for a selected Button component" />
</Frame>
```

## Linking

**Internal links—relative paths:**
```markdown
✓ For more on slots, see [Props and Slots](/components/props-and-slots)
✓ Components sync one-way (see [Syncing Components](/concepts/syncing-components))
```

**External links—add ↗ when helpful:**
```markdown
✓ [Radix ↗](https://www.radix-ui.com/)
✓ [open source ↗](https://github.com/SubframeApp/subframe)
```

## Terminology

**Consistent terms:**
- Ask AI
- Design mode, Prototype mode, Code mode
- Inspector panel, Layers panel
- Component library
- Theme
- MCP server
- CLI
- Properties, Slots
- Stacks
- Quick insert
- Cmd+K

**Action verbs:**
- "click" for mouse actions on buttons/links
- "select" for choosing from menus: "Click **...** and select **Delete**"
- "press" for keyboard events: "press <kbd>S</kbd> to save"
- "navigate to" for moving between pages

## Product-specific patterns

**Quick insert menu:**
```markdown
Open the [quick insert](/learn/design-mode/adding-elements) <Icon icon="plus" size={16} /> menu
```

**Right-click actions (two steps):**
1. "Right-click or press <kbd>/</kbd> to open [quick actions](/learn/design-mode/quick-actions)"
2. "Select **Action**"

## Updating from product/code changes

When updating docs based on product or code changes:

- Verify all subframe.com and app.subframe.com links still work
- Update copy to align with new terminology, UI labels, or behavior
- If screenshots may be outdated, add a `{/* TODO: Update image */}` comment
- Search for related mentions across docs that may need updating

## Do not

- Skip frontmatter on any MDX file
- Use absolute URLs for internal links
- Include untested code examples
- Make assumptions—always ask for clarification
- Use generic placeholder examples like "MyComponent"

## References

- docs.json schema: https://mintlify.com/docs.json
- Mintlify components: https://mintlify.com/docs/content/components
