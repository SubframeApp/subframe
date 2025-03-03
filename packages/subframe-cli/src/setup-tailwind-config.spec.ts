import { transformTailwindConfigContent } from "./setup-tailwind-config"

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

function makeTailwindConfigContents(config: object, type: "esm" | "cjs" | "ts" = "cjs") {
  switch (type) {
    case "esm":
      return `/** @type {import('tailwindcss').Config} */
export default ${JSON.stringify(config, null, 2)} satisfies Config`
    case "cjs":
      return `/** @type {import('tailwindcss').Config} */
  module.exports = ${JSON.stringify(config, null, 2)}
  `
    case "ts":
      return `import type { Config } from 'tailwindcss'
      export default ${JSON.stringify(config, null, 2)} satisfies Config`
  }
}

async function getTransformedTailwindConfigFile(
  config: object,
  type: "esm" | "cjs" | "ts" = "cjs",
): Promise<[string, string]> {
  // Taken from Next13's default tailwind config
  const contents = makeTailwindConfigContents(config, type)
  const before = contents

  const after = await transformTailwindConfigContent(
    before,
    SUBFRAME_DIR_PATH,
    `${CWD}/tailwind.config.${type === "ts" ? "ts" : "js"}`,
  )
  return [before, after]
}

describe("#transformTailwindConfig", () => {
  it("adds content to empty NextJS tailwind config", async () => {
    const [_before, after] = await getTransformedTailwindConfigFile({})
    expect(after).toMatchSnapshot()
  })

  it("adds content to default NextJS tailwind config", async () => {
    const [_before, after] = await getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG)
    expect(after).toMatchSnapshot()
  })

  it("adds content to default Vite tailwind config with presets property", async () => {
    const [_before, after] = await getTransformedTailwindConfigFile(VITE_TAILWIND_CONFIG_WITH_PRESETS_PROPERTY)
    expect(after).toMatchSnapshot()
  })

  it("adds content to ESM-style file", async () => {
    const [_before, after] = await getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG, "esm")
    expect(after).toMatchSnapshot()
  })

  it("adds content to TypeScript file", async () => {
    const [_before, after] = await getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG, "ts")
    expect(after).toMatchSnapshot()
  })

  it("running it the second time does not change the file", async () => {
    let [_before, after] = await getTransformedTailwindConfigFile(DEFAULT_TAILWIND_CONFIG, "ts")
    const firstRun = after
    after = await transformTailwindConfigContent(after, SUBFRAME_DIR_PATH, `${CWD}/tailwind.config.ts`)
    expect(after).toEqual(firstRun)
  })
})
