import { defineConfig } from "vitest/config"

// End-to-end suite: spawns the built CLI against a mock backend. Run with
// `npm run test:e2e` (which builds the bundle first). Kept separate from the
// fast unit suite and serialized because the tests share one mock server port.
export default defineConfig({
  test: {
    include: ["test/e2e/**/*.test.ts"],
    testTimeout: 30_000,
    hookTimeout: 30_000,
    fileParallelism: false,
  },
})
