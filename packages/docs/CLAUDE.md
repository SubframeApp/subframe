# Subframe documentation

## Working relationship

- Push back on ideas when needed—cite sources and explain your reasoning
- ALWAYS ask for clarification rather than making assumptions
- NEVER lie, guess, or make up information
- ALWAYS verify features against the actual codebase (@design-code-app and @subframe repos) before documenting
- UNDERSTAND the product interactions from the user's perspective based on the actual codebase

## Project context

- Format: MDX files with YAML frontmatter
- Config: docs.json for navigation, theme, settings
- Components: Mintlify components (Note, Warning, Tip, CodeGroup, Tabs, Card, etc.)
- Directory structure mirrors docs.json navigation
- **OUTLINE.md:** Complete docs structure reference; used as initial reference when writing new content; keep in sync with articles when making changes to docs

## Core philosophy

Subframe serves designers (visual editing, AI design) and engineers (code export, CLI, integration) simultaneously. Documentation must be:

- **Concise**: 10-25 word explanations for concepts
- **Action-oriented**: Focus on what users do, not abstract theory
- **Accurate**: Verify every feature against codebase implementation
- **Practical**: Use realistic examples, never generic placeholders

## Content strategy

**Utility-first documentation:**
- Open immediately with solutions, not preamble
- End when problem-solving completes, no forced conclusions
- Document just enough for user success–not too much, not too little

**Task-oriented content:**
- Most articles enable a specific outcome with verb-based titles: "Create," "Customize," "Design," "Ship"
- Some articles are feature-focused (e.g., "Inspector," "Layers") but internal sections remain task-oriented
- Prioritize "What can I accomplish?" over "What is this feature?"
- Introductions state the outcome or use cases

**One task per article:**
- Articles with multiple purposes confuse users
- Exception: Feature-focused articles and overview/hub pages

**Layered complexity:**
- Beginners get 5-minute wins; experts access advanced knowledge; everyone learns best-practices
- The mental model should be clear and consistent across all articles
- No single article tries to serve all audiences

**Content types:**

| Type | Purpose | Length | Tone | Visual Density |
|---|---|---|---|---|
| Quickstart | First value in <5 min | 300-500 words | Encouraging | High |
| How-to guide | Complete specific task | 500-1500 words | Instructional | Medium |
| Conceptual guide | Understand how/why | 800-2000 words | Educational | Low-medium |
| Reference | Technical specs | Varies | Precise | Low |
| Troubleshooting | Solve problems | 200-800 words | Pragmatic | Medium |

**Visual-first learning:**
- Every major concept includes screenshots, GIFs, or videos
- Show: Simple UI navigation, multi-step workflows, before/after states
- Tell: Simple instructions, conceptual definitions, lists of options

**Evergreen and consistent:**
- Make content evergreen when possible
- Search for existing information before adding new content
- Check existing patterns for consistency
- Start by making the smallest reasonable changes

## Writing standards

### Voice and tone

- Second-person ("you"), present tense, active voice
- Professional yet approachable—balance technical authority with accessibility
- Encouraging rather than prescriptive—frame features as enabling creativity
- Write for scanning, not reading (short sentences, clear paragraphs)

**Active voice over passive:**
```markdown
✓ Ask AI learns from your existing designs automatically
✓ You can add properties in the Inspector panel
✓ Click **Export** to copy the code

✗ Your designs are indexed by Ask AI automatically
✗ Properties can be added in the Inspector panel
✗ Users can click Export to copy code
```

### Article structure

**Length guidelines:**
- Concept overviews: 60-80 lines
- How-to guides: 150-200 lines
- Detailed technical: 250-400 lines
- Never exceed 450 lines without good reason

**Heading structure:**
- H1: Article title (matches URL slug, sentence case)
- H2: Major sections (3-5 per article maximum)
- H3: Subsections (use sparingly, 0-3 per H2)
- No deeper nesting
- Avoid generic sections like "Best Practices", "Getting Started", "Troubleshooting" unless substantial (50+ lines)
- **Troubleshooting/Common Issues sections**: Always use `<AccordionGroup>` with `<Accordion>` components for better scannability and progressive disclosure

**Sentence structure:**
- Average length: 8-12 words
- Short sentences (5-8 words) for emphasis or transitions
- Longer sentences (15-20 words) for explanations with necessary context
- Rarely exceed 25 words (indicates need to split)

**Paragraph length:**
- 1-3 sentences standard (2-4 for conceptual content)
- 1 sentence: Emphasis, transitions, single-concept statements
- 2-3 sentences: Standard (introduce concept + elaborate + optional example)
- 4-5 sentences: Maximum for conceptual explanations
- 6+ sentences: Red flag; split into multiple paragraphs or add subheading

**Instructions:**
- Imperative voice: "Click," "Select," "Drag," "Type"
- Numbered steps for sequences (1-5 steps typical, max 10)
- Bold clickable UI elements: "Click **Apply**"
- Icon descriptions: "Click the pencil icon" when UI uses symbols

**Introductions and conclusions:**
- Open with immediate value statement or use cases
- Prerequisites section when dependencies exist
- No preambles or historical context
- End when information completes—no forced conclusions
- Include "Learn more" or "Next steps" section with 2-4 related links using CardGroup (see below)

**Frontmatter (required):**
```yaml
---
title: Clear, descriptive page title (sentence case, less than 3 words)
description: Concise summary for SEO/navigation (less than 10 words)
---
```

### Formatting conventions

**UI elements - always bold:**
```markdown
✓ Click the **Export** button
✓ Navigate to **Components > Button**
✓ Select **Create component** from the menu
```

**Keyboard shortcuts - use `<kbd>` tags:**
```markdown
✓ Press <kbd>Cmd</kbd> + <kbd>K</kbd>
✓ <kbd>Shift</kbd> + click to select multiple
```

**Code examples - always complete and tested:**
```tsx Button.tsx
import * as React from "react"

export interface ButtonProps {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export function Button({ variant = "primary", size = "md" }: ButtonProps) {
  return <button className={`btn-${variant} btn-${size}`}>Click me</button>
}
```

**Code blocks - always include:**
- Language tags
- File names when relevant
- Imports
- Full component structure
- TypeScript types
- Expandable code blocks for long examples

**Lists:**
- Dash-style for features/options
- Numbered for sequential steps
- Bold first few words for emphasis

### Visual content

**Image placeholders - detailed alt text:**
```markdown
<img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="The Subframe editor showing the Components tab in the left sidebar with the Button component selected and its documentation displayed in the center panel showing props, variants, and code examples" />
```

Alt text should:
- Describe the specific UI state or screen
- Include actions the user is performing
- Mention key UI elements visible
- Be concise, single sentence
- Provide enough detail to recreate the screen

**Videos:**
```markdown
<video autoPlay muted loop playsInline className="w-full" src="url.webm" />
```

### Mintlify components

**Callouts - use sparingly (1-2 per article maximum):**
```markdown
<Tip>
Efficiency shortcuts, best practices
</Tip>

<Note>
Important context, limitations, exceptions
</Note>

<Warning>
Rare, only for destructive actions or common errors
</Warning>
```

Don't use multiple callouts in a row or for obvious information.

**Code groups - for variations:**
```markdown
<CodeGroup>
  ```bash npm
  npm install package
  ```
  ```bash yarn
  yarn add package
  ```
</CodeGroup>
```

**Tabs - for version differences:**
```markdown
<Tabs>
  <Tab title="Tailwind v3">
  Content specific to v3
  </Tab>
  <Tab title="Tailwind v4">
  Content specific to v4
  </Tab>
</Tabs>
```

**Accordions - for troubleshooting and FAQs:**
```markdown
<AccordionGroup>
<Accordion title="Authentication failed">

Check that you copied the entire token without spaces. Verify it hasn't been revoked.

</Accordion>
<Accordion title="Connection errors">

Verify the URL is correct. Check your internet connection.

</Accordion>
</AccordionGroup>
```

Use accordions for:
- Troubleshooting sections (required)
- Common issues sections (required)
- FAQ-style content
- Multiple independent solutions to problems
- Progressive disclosure of detailed solutions

## Content patterns

### Use specific, realistic examples

```markdown
✓ Create a ProductCard component with title, price, and image
✓ Add a "variant" enum with options: default, featured, sale
✓ Build a stat card showing metrics with trend indicators

✗ Create a component called MyComponent
✗ Add a property called 'text' for the label
✗ Use this pattern for your custom use case
```

### Avoid prescriptive design patterns

Focus on mechanics and flexibility, not specific design choices:

```markdown
✓ Use Stacks to control layout direction and spacing
✓ Adjust padding using the Inspector panel
✓ Choose colors from your theme palette

✗ Always use a vertical stack for card layouts
✗ Buttons should have 24px padding for proper touch targets
✗ Use the brand primary color for call-to-action buttons
```

### Cross-link naturally

Sparse but purposeful (2-5 internal links per article), contextual placement:

**Inline links:**
```markdown
✓ For more on slots, see [Props and Slots](/components/props-and-slots)
✓ Components sync one-way (see [Syncing Components](/develop/syncing-components))

✗ See also: Props and Slots, Syncing Components, Theme Overview
✗ Related articles: [long list of links]
```

**Learn more / Next steps sections - use CardGroup:**
```markdown
## Learn more

<CardGroup cols={2}>
  <Card title="Creating components" icon="plus" href="/components/creating-components">
    Build custom components visually for your design system
  </Card>
  <Card title="Props and slots" icon="puzzle-piece" href="/components/props-and-slots">
    Understand when to use props vs slots for customizing Subframe components
  </Card>
</CardGroup>
```

**IMPORTANT:** Card titles and descriptions **must exactly match** the linked article's frontmatter:
- Card `title` must match article's `title` field (including capitalization)
- Card description must match article's `description` field
- Use 2-4 cards with `cols={2}` for even grid layout
- Icons are optional (from [Font Awesome](https://fontawesome.com/icons))

## Terminology and verbiage

**Consistent terms:**
- Ask AI
- Design mode, Prototype mode, Code mode
- Inspector panel, Layers panel
- Component library
- Theme
- MCP server
- CLI
- Properties
- Slots
- Editor
- Stacks
- Element
- Quick insert
- Cmd+K

**Action verbs:**
- "click" for mouse actions on buttons/links
- "select" for choosing from menus: "Click **...** and select **Delete**"
- "press" for keyboard events: "press <kbd>S</kbd> to save"
- "navigate to" for moving between pages

## Quality checklist

### Every article must have

- Title (sentence case, typically 1-3 words)
- Description (for SEO/navigation, under 10 words)
- 3-5 H2 sections maximum
- Second-person, present tense, active voice
- Specific examples (no "MyComponent" placeholders)
- Tested code examples (if applicable)
- Image placeholders with detailed alt text
- "Learn more" section with 2-3 related links

### Every article must NOT have

- More than 450 lines
- More than 6 H2 sections
- Generic "best practices" sections
- Repetitive troubleshooting (unless substantial)
- Design-specific prescriptions
- Untested code examples
- Placeholder examples like "MyComponent"

### When to consolidate

Merge articles when:
- Combined length < 300 lines
- Content is tightly related
- Same workflow or feature area
- Reduces navigation complexity

### When to split

Split articles when:
- Combined length > 450 lines
- Distinct audiences or use cases
- Different skill levels (basic vs advanced)
- Clear workflow separation

## Maintaining OUTLINE.md

**IMPORTANT:** Keep OUTLINE.md in sync when making documentation changes.

### When to update

Update OUTLINE.md when you:
- Add/remove articles
- Change article titles or descriptions (frontmatter)
- Modify heading structure (H2/H3)
- Reorder navigation in docs.json

### How to update

From the docs directory, run:

```bash
./scripts/generate-outline.sh > OUTLINE.md
```

The script regenerates the complete outline in the correct format with all 56 articles matching docs.json order.

**Rule:** Never commit documentation structure changes without updating OUTLINE.md.

## Git workflow

- NEVER use --no-verify when committing
- Ask how to handle uncommitted changes before starting
- Create a new branch when no clear branch exists for changes
- Commit frequently throughout development
- NEVER skip or disable pre-commit hooks

## References

- docs.json schema: https://mintlify.com/docs.json
- Cursor docs (conciseness): https://cursor.com/docs/get-started/concepts
- Mintlify components: https://mintlify.com/docs/content/components
