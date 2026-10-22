# Subframe setup and recovery

Keep a working installation. Do not rerun init merely because implementation was requested. Work in the application package; preserve its framework and package manager. For a new app, use the requested framework and a new directory. Resolve any mismatch between the design's project and local sync configuration before syncing.

Use existing CLI credentials. Otherwise call generate_auth_token with the selected project's teamId and supply the token through SUBFRAME_AUTH_TOKEN. Keep credentials out of source files and reports. CLI authentication is separate from the host's MCP connection.

Adapt explicit paths and choices to the app:

```sh
npx @subframe/cli@latest init --yes -p PROJECT_ID \
  --dir ./src/ui --alias "@/ui/*" \
  --css-type tailwind-v4 --css-path src/index.css \
  --tailwind --install --no-sync
```

Use --css-type tailwind for v3. For a new app, add --template (vite, nextjs, or astro) and --name. Keep the existing import alias where possible. If an alias decision is required, pass --update-import-alias or --no-update-import-alias deliberately; changing the project's export alias affects other consumers.

Verify the resulting setup:

- .subframe/sync.json names the intended project, directory, and import alias. Resolve the alias in both TypeScript and the framework's bundler.
- Tailwind v3 loads the generated preset and scans the component directory; import theme.css too when generated for dark mode. Tailwind v4 loads generated theme.css from the global stylesheet alongside Tailwind.
- Load fonts using list_fonts: Google font loading or custom @font-face rules with the correct family, weights, styles, and variable ranges. Init does not install font loading. Match generated family names when a framework font loader rewrites them.
- Activate generated dark styles with the dark class when needed.

Use search_docs for framework-specific failures; repair the affected configuration. Sync missing components by name as described in SKILL.md. For setup alone, verify the app starts; fetch a page only if supplied or needed to diagnose rendering. Do not invent a screen for verification.
