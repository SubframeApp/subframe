import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    clearMocks: true,
    // The e2e suite has its own config (vitest.e2e.config.ts) and is run via
    // `npm run test:e2e`; keep it out of the fast unit run.
    exclude: [...configDefaults.exclude, "test/e2e/**"],
  },
})
