# Subframe Documentation Outline

**Total Articles:** 56
**Generated:** 2025-11-14
**Order:** Matches docs.json navigation structure

This outline shows the complete documentation structure with:
- Title and description from each article's frontmatter
- URL path
- Full heading hierarchy (H2 and H3)

---

## /get-started/introduction

**Title:** Introduction
**Description:** Design UI and export React + Tailwind code

## Who uses Subframe?
## How it works
## What makes it different
## Learn more

## /get-started/quickstart

**Title:** Quickstart
**Description:** Create your first design and export to code

## Sign up
## Create your page
### Generate with AI
### Or use templates
### Customize in Design Mode
## Build with AI coding tools
### Set up MCP server
### Build with your AI assistant
## Or manually copy code
### Install CLI
### Use the code
## Learn more

## /get-started/concepts

**Title:** Concepts
**Description:** Core concepts for designing and building

## Projects
## Components
## Pages
## Theme
## Syncing
## Ask AI
## Prototypes
## MCP server

## /get-started/faq

**Title:** FAQ
**Description:** Frequently asked questions about Subframe


## /installation/new-project

**Title:** Set up new project
**Description:** Start a new project with optimized templates

## Prerequisites
## Create project
### Choose framework
### Authenticate
### Configure
## What gets installed
## Next steps

## /installation/existing-project

**Title:** Install in existing codebase
**Description:** Add Subframe to your existing React project

## Prerequisites
## Install
### Authenticate
### Configure
## Verify installation
## Framework-specific guidance
## Common issues

## /installation/framework-guides/nextjs

**Title:** Next.js
**Description:** Install Subframe in your Next.js app

## Installation
## App Router (Next.js 13+)
### Client components
### Server components
## Pages Router (Next.js 12 and earlier)
## Navigation with Next.js Link
## Image optimization

## /installation/framework-guides/vite

**Title:** Vite
**Description:** Install Subframe in your Vite + React app

## Installation
## Configure import aliases
### Update tsconfig.app.json
### Update vite.config.ts
## Use components

## /installation/framework-guides/astro

**Title:** Astro
**Description:** Install Subframe in your Astro app

## Installation
## Configure import aliases
## Use components in Astro
### Client directives
### Static components

## /installation/framework-guides/monorepo

**Title:** Monorepo
**Description:** Install Subframe in monorepo setups

## Installation strategies
### Shared UI package (recommended)
### Per-app installation
## Shared UI package setup
### 1. Create the shared package
### 2. Initialize Subframe
### 3. Export components
### 4. Install in apps
### 5. Configure Tailwind in apps

## /installation/framework-guides/manual

**Title:** Custom setup
**Description:** Install Subframe without the CLI

## Step 1: Install dependencies
## Step 2: Create directory structure
## Step 3: Create sync configuration
## Step 4: Configure TypeScript
## Step 5: Get your theme configuration
### For Tailwind v3
### For Tailwind v4
## Step 6: Configure Tailwind in your project
### For Tailwind v3
### For Tailwind v4
## Step 7: Sync components
## Step 8: Import fonts (if needed)
### Next.js
### Vite or other frameworks
## Step 9: Verify installation
## Troubleshooting

## /developing/mcp-server

**Title:** MCP server
**Description:** Connect AI coding tools to your Subframe projects

## Installation
## Using the MCP server
### Available tools
### Prompt with MCP link
### Example prompts
## Troubleshooting

## /developing/syncing-components

**Title:** Syncing components
**Description:** Keep components in sync with the CLI

## Running sync
### Sync specific components
### Command options
## When to sync
## Preventing overwrites

## /developing/exporting-code

**Title:** Exporting code
**Description:** Copy page code from Subframe to your codebase

## Code generation
## Getting code
### MCP server (recommended)
### Code panel
## Exporting pages
## Using Code panel
## Updating designs
## Learn more

## /developing/adding-business-logic

**Title:** Adding business logic
**Description:** Integrate state management, API calls, and event handlers into your Subframe-exported code.

## Example 1: Magic link login form
## Example 2: Interactive track cards

## /developing/tailwind-config

**Title:** Tailwind configuration
**Description:** How Subframe extends your Tailwind config

## How it works
## Using theme tokens
## Customization
### Content paths
### Responsive design
### Plugins
### Tailwind v4
## Common issues
## Learn more

## /developing/auth-tokens

**Title:** Auth tokens
**Description:** Generate API tokens for CLI and MCP access

## Creating a token
### First-time CLI setup
## Using tokens
### CLI authentication
### MCP server configuration
## Managing tokens
## Troubleshooting
## Learn more

## /developing/disabling-sync

**Title:** Disabling sync
**Description:** Prevent CLI from overwriting customized components

## When to disable sync
## Try wrapper components first
### Basic wrapper
### Advanced wrapper with state
## Disable sync with @subframe/sync-disable
### After disabling
### Re-enabling sync
### Document your changes
## Troubleshooting
## Learn more

## /theme/overview

**Title:** Theme overview
**Description:** Understand Subframe's theme system built on design tokens and Tailwind CSS.

## What are design tokens?
## Token categories
## How themes work with Tailwind
## Accessing your theme
## Next steps

## /theme/customizing-theme

**Title:** Customizing theme
**Description:** Modify colors, typography, and other design tokens to match your brand.

## Accessing theme settings
## Quick theme updates
## Customizing color tokens
### Editing existing colors
### Creating custom color tokens
## Typography tokens
## Spacing, borders, and shadows
## Syncing theme changes to code
## Best practices
### Use semantic names
### Reference existing tokens
### Test across components

## /theme/importing-tokens

**Title:** Importing tokens
**Description:** Import design tokens from Figma or other design systems into Subframe.

## Overview
### Why Import Tokens?
### Supported Sources
## Importing from Figma
### Prerequisites
### Import Process
### Availability
### Requesting Access
## Token Format
### Color Tokens
### Typography Tokens
### Spacing Tokens
### Other Tokens
## Mapping Tokens
### Automatic Mapping
### Manual Adjustments
### Token Naming
## After Importing
### Review Imported Tokens
### Test Components
### Adjust as Needed
## Maintaining Sync
### Re-importing Updates
### Version Control
## Best Practices
### Clean Token Structure
### Test Before Import
### Document Sources
## Troubleshooting
### Import Failures
### Token Conflicts
### Missing Tokens

## /theme/dark-mode

**Title:** Dark mode
**Description:** Implement dark mode in your codebase using CSS variables and Tailwind's dark mode support.

## Prerequisites
## How it works
## Step 1: Configure Tailwind for CSS variables
## Step 2: Create CSS variables file
## Step 3: Import variables globally
## Step 4: Toggle dark mode
### Next.js with next-themes
### React with context
### Theme toggle button
## Best practices
### Test in both modes
### Respect system preferences
### Prevent flash of unstyled content
## Troubleshooting

## /components/overview

**Title:** Components overview
**Description:** Build and maintain your design system visually with React + Tailwind components.

## Base components
## Building your design system
## Design to code workflow
## Component anatomy
## Syncing to code
## Next steps

## /components/creating-components

**Title:** Creating components
**Description:** Build custom components visually for your design system.

## Creating from existing design
### AI-powered property suggestions
## Creating from scratch
## Adding properties
## Variants
## States
## Slots
## Component structure
## Saving and syncing
## Editing components
## Learn more

## /components/using-components

**Title:** Using components
**Description:** Add and configure components in Subframe, then use them in your React code.

## Adding components
## Component instances
### Instance properties
## Configuring components
## Overriding instance styles
## Detaching instances
## Component documentation
## Using in code
### Importing
### Props and events
### Slots
### Wrapper components
## Troubleshooting
## Learn more

## /components/props-and-slots

**Title:** Props and slots
**Description:** Understand when to use props vs slots for customizing Subframe components.

## When to use each
## Example: Props vs slots
## Creating props and slots
## Learn more

## /editor/overview

**Title:** Editor overview
**Description:** Learn the Subframe editor interface and navigate between editing modes.

## Editor modes
## Interface layout
### Canvas
### Left sidebar
### Right sidebar (Inspector)
### Top toolbar
## Navigation
## Collaboration
## Learn more

## /editor/ask-ai/prompt-to-design

**Title:** Prompt to design
**Description:** Generate complete page designs from text descriptions using AI.

## How it works
## Accessing Ask AI
## Writing effective prompts
### Be specific about structure
### Describe the layout
### Reference your components
### Set the mood
## Example prompts
## Generating designs
## Applying designs
## Iterating on designs
## Best practices
### Start broad, then refine
### Use your theme
### Try multiple variations
### Reference existing pages
### Iterate gradually
## Tips for better results
## Limitations

## /editor/ask-ai/image-to-design

**Title:** Image to design
**Description:** Upload images or screenshots and generate matching Subframe designs with AI.

## How it works
## Uploading images
## Writing prompts with images
## Common use cases
## Refining results
## Best practices
## Limitations
## Learn more

## /editor/ask-ai/inline-ask-ai

**Title:** Inline Ask AI
**Description:** Make targeted edits to selected elements using AI without leaving Design Mode.

## How to use it
## Example edits
## Quick insert
## Tips for better results
## Limitations
## Learn more

## /editor/ask-ai/remix-pages

**Title:** Remix pages
**Description:** Use AI to create variations and remixes of existing page designs.

## How remixing works
## Example remix prompts
## Common use cases
## Tips for better remixes
## Limitations
## Learn more

## /editor/ask-ai/personalizing-ai

**Title:** Personalizing AI
**Description:** Customize how AI generates designs by adding company information and design preferences.

## What AI personalization does
## Setting up personalization
## Example personalization
## What AI learns from personalization
## Best practices
## Personalization per project
## Learn more

## /editor/design-mode/page-editor

**Title:** Page Editor
**Description:** Design production-ready interfaces in a responsive, flex-based editor.

## How the page editor works
## Editor interface
## Flex-based layout system
## Why this matters for AI
## Canvas navigation
## Selecting elements
## Smart guides
## Breakpoints
## Learn more

## /editor/design-mode/add-elements

**Title:** Add elements
**Description:** Insert components, primitives, and layouts into your designs.

## Insert panel
## Quick insert
## Primitives
### Stack
### Text
### Icon
### Image
### Divider
## Components
## Command palette
## Copy and paste
## Positioning elements
## Element hierarchy
## Learn more

## /editor/design-mode/layers

**Title:** Layers
**Description:** Navigate and organize the element hierarchy.

## Opening the Layers panel
## Navigating the hierarchy
## Understanding hierarchy
## Reordering elements
## Renaming layers
## Layer actions
## Searching layers
## Learn more

## /editor/design-mode/inspector

**Title:** Inspector
**Description:** Configure element properties in the right sidebar.

## Opening the Inspector
## Inspector sections
### Component properties
### Layout
### Style
### Typography
### Image properties
### Icon properties
### Tailwind CSS
### Overrides
## Editing properties
## Keyboard navigation
## Multi-selection
## Learn more

## /editor/design-mode/responsive-design

**Title:** Responsive design
**Description:** Design for mobile and desktop breakpoints.

## Breakpoints
## Switching breakpoints
## Mobile overrides
## Properties that support overrides
## Common responsive patterns
## Code export
## Best practices
## Learn more

## /editor/design-mode/page-layouts

**Title:** Page layouts
**Description:** Apply navigation and modal layouts to your pages.

## Layout types
## Setting the page layout
## Default layout
## Dialog layout
## Drawer layout
## No Layout
## Layout inheritance
## Learn more

## /editor/design-mode/preview

**Title:** Preview
**Description:** Preview your designs and test interactions.

## Opening preview
## Testing responsive design
## Sharing previews
## What preview shows
## Learn more

## /editor/design-mode/actions-menu

**Title:** Actions menu
**Description:** Quick access to element actions with the slash command.

## Opening the Actions menu
## Using the menu
## Available actions
### Element operations
### Structure
### Layout
### Sizing
### Style
### Typography
### Advanced
## Keyboard shortcuts
## Multi-selection
## Learn more

## /editor/design-mode/custom-css

**Title:** Custom Tailwind CSS
**Description:** Add custom Tailwind utility classes to elements.

## Adding custom classes
## Removing custom classes
## How custom classes work
## Supported Tailwind features
## Custom classes vs Inspector
## Mobile overrides
## Tailwind documentation
## Actions menu integration
## Code export
## Best practices
## Limitations
## Learn more

## /editor/prototype-mode/overview

**Title:** Prototype mode overview
**Description:** Create interactive prototypes with AI-powered code generation.

## How it works
## What you can prototype
## Switch to Prototype Mode
## Learn more

## /editor/prototype-mode/annotations

**Title:** Annotations
**Description:** Add instructions to guide AI prototype generation.

## Adding annotations
## Example annotations
## Managing annotations
## Writing good annotations
## Learn more

## /editor/prototype-mode/chat-with-ai

**Title:** Chat with AI
**Description:** Converse with AI to build and refine your prototype.

## Starting the conversation
## Refining your prototype
## Example conversation
## Best practices
## Learn more

## /editor/prototype-mode/updating-designs

**Title:** Updating designs
**Description:** Rebuild prototypes when designs change.

## When to update
## Regenerating the prototype
## What gets preserved
## What might break
## Testing after updates
## Learn more

## /editor/prototype-mode/view-prototype-code

**Title:** View prototype code
**Description:** Inspect and export the generated prototype code.

## Viewing the code
## Code structure
## Using prototype code
## Limitations
## Learn more

## /editor/prototype-mode/sharing-prototypes

**Title:** Sharing prototypes
**Description:** Share interactive prototypes with your team or stakeholders.

## Generating a share link
## What viewers see
## Updating shared prototypes
## Disabling sharing
## Learn more

## /editor/code-mode/inspecting-code

**Title:** Inspecting code
**Description:** View and copy generated code in multiple formats from Code Mode.

## Opening Code Mode
## Inspect tab
### MCP server link
### Syncing components
## Code formats
### React + Tailwind
### CSS
### Properties
### Replit
## Settings
## Learn more

## /editor/code-mode/export-preferences

**Title:** Installation
**Description:** Set up Subframe in your project using CLI, Cursor, Claude, or Replit.

## Manual setup
## Cursor MCP server
## Claude Code MCP server
## Export to Replit
## MCP server benefits
## Learn more

## /editor/code-mode/export-prompts

**Title:** Export prompts
**Description:** Pre-written prompts for common Subframe integration tasks.

## Available prompts
### 1. Sync all components in current page
### 2. Create a new page from the current design
### 3. Update an existing page based on the current design
### 4. Add accessibility tags
### 5. Migrate to Subframe design system
## How to use prompts
## MCP server requirement
## Learn more

## /admin/inviting-team-members

**Title:** Inviting team members
**Description:** Add collaborators to your Subframe team and manage invitations.

## Sending invitations
## Who can invite
## Invitation status
## What team members can access
## Accepting invitations
## Billing impact
## Limitations
## Learn more

## /admin/roles-and-permissions

**Title:** Roles and permissions
**Description:** Understand what each team role can access and modify in Subframe.

## Available roles
## Permission breakdown
### Design and code access
### Team management
### Billing access
## Permission enforcement
## Changing roles
## Billing implications
## First team member role
## Role restrictions by feature
### AI features
### Version history
### Code export
## Learn more

## /admin/pricing-and-plans

**Title:** Pricing and plans
**Description:** Understand Subframe's subscription tiers and features.

## Available plans
## Plan comparison
### Free plan features
### Pro plan features
### Custom plan features
## How billing works
### Seat-based pricing
### When you're charged
### Billing cycle
## Upgrading to Pro
## Managing your subscription
### Access billing portal
### Changing payment methods
### Canceling subscription
## Free trial
## Viewer seats are free
## Downgrading
## Student and educator discounts
## Learn more

## /admin/managing-projects

**Title:** Managing projects
**Description:** Create, organize, and delete projects in your workspace.

## Creating projects
### New blank project
### Duplicate from existing project
### What's in a new project
## Renaming projects
## Switching projects
### Project switcher
### Syncing design system changes
## Deleting projects
### Deleting a project
### What happens when you delete the current project
## Project settings
### Accessing project settings
### Project metadata
## Project access and permissions
### Shared with all team members
### Role-based access
## Project organization
### What you cannot do across projects
### How to organize projects
## Project limitations
### Free plan
### Pro plan
### Team plan
### Cannot move between teams
## Learn more

## /admin/auth-tokens

**Title:** Auth tokens
**Description:** Understand how auth tokens work for your team members.

## How tokens work for teams
### Personal tokens
### Who can create tokens
## Token security
### User responsibility
### When tokens stop working
## Managing your own tokens
## Team best practices
### Educate team members
### Offboarding
### Role changes
## Learn more

## /admin/sso/okta

**Title:** Okta SSO
**Description:** Set up Okta single sign-on for your team.

## How SSO works
## Prerequisites
## Configuration steps
### 1. Request SSO setup
### 2. Configure Okta application
### 3. Subframe configures SSO provider
### 4. Test SSO login
## User provisioning
### Automatic team joining
### Pre-inviting users
## SSO-only enforcement
## Managing SSO users
### Role assignment
### Removing users
## Troubleshooting
### "This organization requires single sign-on"
### "No SSO provider found"
### Redirect to Okta fails
### User lands on wrong team
## Limitations
## Learn more

