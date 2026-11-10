# Contributing

Issues and pull requests are welcome. For a larger change, open an issue first so we can agree on the approach.

## Build and test

Node 24 and npm 11 are required (see `.nvmrc`).

```sh
npm ci
npm run lint
npm run ts
npm run test
```

Run a single workspace with `npx turbo run test --filter=@subframe/cli`.

## Changesets

A pull request that changes `@subframe/cli` needs a changeset:

```sh
npx changeset
```

Pick the package and the bump (patch, minor or major), write a one-line summary for the changelog, and commit the generated file in `.changeset/`. CI fails without one.

`@subframe/core` is mirrored here from Subframe's main repository on each release, so edits to it in this repo are overwritten. Open an issue for core changes instead.

By contributing you agree your work is released under the [MIT License](LICENSE).
