---
name: develop
description: Implement Subframe designs with business logic. Use after designing with /subframe:design or when given a Subframe URL/page ID.
argument-hint: "[page URL, page ID, or 'the design I just made']"
---

Implement Subframe designs in the codebase. Fetch the design via MCP, sync components, and add business logic.

## Workflow

1. **Fetch the design** - Use `get_page_info` with the URL, ID, or name
2. **Sync components** - Run `npx @subframe/cli@latest sync --all`
3. **Create the page** - Put it in the right place per codebase patterns
4. **Add business logic** - Data fetching, forms, events, loading/error states

## Fetching Designs

```
// By URL
get_page_info({ url: "https://app.subframe.com/PROJECT/design/PAGE_ID/edit" })

// By ID (e.g., from /subframe:design)
get_page_info({ id: "PAGE_ID", projectId: "PROJECT_ID" })

// By name
get_page_info({ name: "Settings Page", projectId: "PROJECT_ID" })

// List all pages first if needed
list_pages({ projectId: "PROJECT_ID" })
```

Get the `projectId` from `.subframe/sync.json`.

## Syncing Components

Always sync before implementing:

```bash
npx @subframe/cli@latest sync --all
```

**Never modify synced component files** - they get overwritten. Create wrapper components if you need to add logic.

## Adding Business Logic

Subframe generates presentational code with placeholder data. You add:

**Data fetching:**

```tsx
const { data, isLoading, error } = useQuery(...)

if (isLoading) return <Skeleton />
if (error) return <Alert variant="error">{error.message}</Alert>

return <PageComponent {...data} />
```

**Form handling:**

```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  await submitForm(formData)
}
```

**Event handlers:**

```tsx
<Button onClick={handleClick}>Submit</Button>
<Card actionSlot={<IconButton onClick={handleDelete} />} />
```

## Updating Existing Pages

When a design changes:

1. Fetch the updated design
2. Update layout/structure from new design
3. Preserve existing hooks, handlers, and state management
4. Sync any new components

When diffing the updated design against the existing code, if there are design changes beyond what the user asked you to design (e.g., layout tweaks, new elements, removed sections), call those out and ask whether to include them.

## MCP Tools Reference

| Tool                 | Purpose              | Key Parameters                      |
| -------------------- | -------------------- | ----------------------------------- |
| `get_page_info`      | Fetch page code      | `url`, `id`, or `name`; `projectId` |
| `get_component_info` | Fetch component code | `url`, `id`, or `name`; `projectId` |
| `list_pages`         | List all pages       | `projectId`                         |
| `list_components`    | List all components  | `projectId`                         |
| `get_theme`          | Get Tailwind config  | `projectId`, `cssType`              |
