import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    clearMocks: true,
    setupFiles: ["./src/test-setup.ts"],
  },
})
