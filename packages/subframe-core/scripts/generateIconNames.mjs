import camelCase from "camelcase"
import { mkdir, readdir, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { format } from "prettier"

const __dirname = dirname(fileURLToPath(import.meta.url))

const ICON_FILE_SUFFIX = ".svg"
const ICON_DIR = resolve(__dirname, "../src/assets/icons/raw")
const OUTPUT_PATH = resolve(__dirname, "../src/generated")
const OUTPUT_FILE = "iconNames.ts"

// This is a script to generate a list of icon names from the SVG files in the icons directory.
// It will create a file called iconNames.ts in the same directory with the list of icon names.
// It allows us to only import the icons we need in the code, instead of importing all of them.
// This is useful for tree-shaking and reducing the bundle size.

async function generateIconNames() {
  const iconFiles = (await readdir(ICON_DIR, { withFileTypes: true })).filter(
    (file) => file.isFile() && file.name.endsWith(ICON_FILE_SUFFIX),
  )
  const iconNames = iconFiles.map((file) =>
    // Note(chris): yoinked this camelCase function directly from @svgr/cli to make sure we're using the same function: https://github.com/gregberge/svgr/blob/main/packages/cli/src/util.ts#L22
    camelCase(file.name.slice(0, -ICON_FILE_SUFFIX.length), { pascalCase: true }),
  )

  await mkdir(OUTPUT_PATH, { recursive: true })
  const outputContent = `// This file is auto-generated. Do not edit manually.
export const iconNames = [${iconNames.map((name) => `"${name}"`).join(", ")}] as const

export type IconName = typeof iconNames[number] | "empty"| null
`
  const outputPath = join(OUTPUT_PATH, OUTPUT_FILE)
  await writeFile(outputPath, await format(outputContent, { semi: false, singleQuote: true, parser: "typescript" }))
  console.log(`Generated icon names at ${outputPath}`)
}

generateIconNames()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
