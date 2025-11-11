import { Project, SourceFile } from "ts-morph"
import { describe, expect, it, vi } from "vitest"
import { transformTailwindConfigFile } from "./setup-tailwind-v3"
import { addThemeImportToCss } from "./setup-tailwind-v4"

// Note(Chris): Required for vitest to not crash when running tests:
vi.mock("ora", () => ({
  default: () => {
    const start = vi.fn()
    const result = { start }
    return result
  },
}))

// Taken from Next13's default tailwind config
const DEFAULT_TAILWIND_CONFIG = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}

// Taken from Tailwind's Vite guide
// Modified to have a presets property
// https://tailwindcss.com/docs/guides/vite
const VITE_TAILWIND_CONFIG_WITH_PRESETS_PROPERTY = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [],
}

const CWD = "cwd/path"
const SUBFRAME_DIR_PATH = "subframe-dir/path"

type ConfigType = "cjs" | "esm" | "ts"

function makeTailwindConfigContents(config: object, configType: ConfigType) {
  switch (configType) {
    case "cjs":
      return `/** @type {import('tailwindcss').Config} */
  module.exports = ${JSON.stringify(config, null, 2)}
  `
    case "esm":
      return `/** @type {import('tailwindcss').Config} */
export default ${JSON.stringify(config, null, 2)}`
    case "ts":
      return `import type {Config} from 'tailwindcss'
      export default ${JSON.stringify(config, null, 2)} satisfies Config`
  }
}

function getTransformedTailwindConfigFile(config: object, configType: ConfigType = "cjs"): [SourceFile, SourceFile] {
  const project = new Project({ compilerOptions: { allowJs: true } })

  // Taken from Next13's default tailwind config
  const contents = makeTailwindConfigContents(config, configType)

  const beforeFile = project.createSourceFile("./junk/delete-me/before", contents)
  const afterFile = project.createSourceFile("./junk/delete-me/after", contents)
  transformTailwindConfigFile(afterFile, CWD, SUBFRAME_DIR_PATH)
  return [beforeFile, afterFile]
}

describe("#transformTailwindConfig", () => {
  it("adds content to empty NextJS tailwind config", () => {
    const [_before, after] = getTransformedTailwindConfigFile({})
    expect(after.getText()).toMatchSnapshot()
  })

  it("adds content to default NextJS tailwind config", () => {
    const [_before, after] = getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG)
    expect(after.getText()).toMatchSnapshot()
  })

  it("adds content to default Vite tailwind config with presets property", () => {
    const [_before, after] = getTransformedTailwindConfigFile(VITE_TAILWIND_CONFIG_WITH_PRESETS_PROPERTY)
    expect(after.getText()).toMatchSnapshot()
  })

  it("adds content to ESM-style file", () => {
    const [_before, after] = getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG, "esm")
    expect(after.getText()).toMatchSnapshot()
  })

  it("adds content to TypeScript file", () => {
    const [_before, after] = getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG, "ts")
    expect(after.getText()).toMatchSnapshot()
  })

  it("running it the second time does not change the file", () => {
    const [_before, after] = getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG)
    const firstRun = after.getText()
    transformTailwindConfigFile(after, CWD, SUBFRAME_DIR_PATH)
    expect(after.getText()).toEqual(firstRun)
  })
})

describe("#addThemeImportToCss", () => {
  const THEME_PATH = "../ui/theme.css"

  it("adds theme import after tailwindcss import", () => {
    const cssContent = `@import "tailwindcss";

body {
  margin: 0;
}`

    const result = addThemeImportToCss(cssContent, THEME_PATH)
    expect(result).toMatchSnapshot()
  })

  it("adds theme import after tailwindcss import with semicolon", () => {
    const cssContent = `@import "tailwindcss";

body {
  margin: 0;
}`

    const result = addThemeImportToCss(cssContent, THEME_PATH)
    expect(result).toContain('@import "tailwindcss";\n@import "../ui/theme.css";')
  })

  it("adds theme import to the top if tailwindcss import not found", () => {
    const cssContent = `body {
  margin: 0;
}`

    const result = addThemeImportToCss(cssContent, THEME_PATH)
    expect(result).toMatchSnapshot()
  })

  it("does not add theme import if already present", () => {
    const cssContent = `@import "tailwindcss";
@import "../ui/theme.css";

body {
  margin: 0;
}`

    const result = addThemeImportToCss(cssContent, THEME_PATH)
    expect(result).toEqual(cssContent)
  })

  it("works with single quotes in tailwindcss import", () => {
    const cssContent = `@import 'tailwindcss';

body {
  margin: 0;
}`

    const result = addThemeImportToCss(cssContent, THEME_PATH)
    expect(result).toContain("@import 'tailwindcss';\n@import \"../ui/theme.css\";")
  })

  it("handles empty CSS file", () => {
    const cssContent = ``

    const result = addThemeImportToCss(cssContent, THEME_PATH)
    expect(result).toEqual(`@import "../ui/theme.css";\n`)
  })

  it("handles CSS with only tailwindcss import", () => {
    const cssContent = `@import "tailwindcss";`

    const result = addThemeImportToCss(cssContent, THEME_PATH)
    expect(result).toMatchSnapshot()
  })

  it("running it the second time does not change the content", () => {
    const cssContent = `@import "tailwindcss";`

    const firstRun = addThemeImportToCss(cssContent, THEME_PATH)
    const secondRun = addThemeImportToCss(firstRun, THEME_PATH)
    expect(secondRun).toEqual(firstRun)
  })
})
