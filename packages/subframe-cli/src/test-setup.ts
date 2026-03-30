import { vi } from "vitest"

// Mock isDev to ensure consistent behavior across all test environments
// This prevents snapshot differences when running tests locally vs in CI or Claude Code
vi.mock("./common", async (importOriginal) => {
  const original = await importOriginal<typeof import("./common")>()
  return {
    ...original,
    // Always use production URLs in tests for consistent snapshots
    isDev: false,
  }
})
