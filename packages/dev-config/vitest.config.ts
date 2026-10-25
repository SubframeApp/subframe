import { defineConfig } from "vitest/config"
import { assertSpecNaming } from "./spec-naming"

assertSpecNaming({ root: import.meta.dirname, runnerGlobs: { unit: ["**/*.spec.{ts,tsx}"] } })

export default defineConfig({})
