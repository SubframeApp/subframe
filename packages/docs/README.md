# Subframe docs

The [Subframe documentation](https://docs.subframe.com) uses Mintlify. Pages are MDX files, and `docs.json` defines navigation and site settings.

## Previewing locally

Install dependencies from the repository root with Node.js 24 and npm 11:

```bash
npm install
npm run dev --workspace=@subframe/docs
```

Open the local URL printed by Mintlify. The workspace command runs in `packages/docs`, alongside `docs.json`.

## Checking changes

From the repository root, check internal links:

```bash
npm run broken-links --workspace=@subframe/docs
```

Validate the site from the docs directory:

```bash
cd packages/docs
npx mintlify validate
```

Preview changed pages to check formatting, examples, and navigation. A successful link check does not verify that product instructions or code examples are correct.
