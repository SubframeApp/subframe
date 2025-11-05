import { readFile, writeFile } from "fs/promises"
import { dirname, join, relative, resolve } from "node:path"
import prompts from "prompts"
import { TAILWIND_CSS_EXPORT_FILENAME } from "shared/constants"
import { abortOnState } from "./prompt-helpers"
import { exists, posixJoin } from "./utils/fs"

// Exported for testing
export function addThemeImportToCss(cssContent: string, relativeThemeImportPath: string): string {
  // Bail out if already set up
  if (cssContent.includes(relativeThemeImportPath)) {
    return cssContent
  }

  // Find the position right after @import "tailwindcss"
  const tailwindImportRegex = /@import\s+["']tailwindcss["'];?/
  const match = cssContent.match(tailwindImportRegex)

  let updatedContent: string
  if (!match || match.index === undefined) {
    // Add to the top of the file if the @import "tailwindcss"; is not found.
    updatedContent = `@import "${relativeThemeImportPath}";\n${cssContent}`
  } else {
    // Insert the theme.css import right after the @import "tailwindcss";
    const insertPosition = match.index + match[0].length
    const newImport = `\n@import "${relativeThemeImportPath}";`
    updatedContent = cssContent.slice(0, insertPosition) + newImport + cssContent.slice(insertPosition)
  }

  return updatedContent
}

export async function setupTailwindV4(
  { projectPath, rootPath: subframeDirPath }: { projectPath: string; rootPath: string },
  opts: { globalCssPath?: string; tailwind?: boolean },
) {
  prompts.override({
    updateTailwindConfig: opts.tailwind,
  })

  const response = await prompts({
    type: "confirm",
    name: "updateTailwindConfig",
    initial: true,
    message: "Do you want Subframe to add the theme.css import to your global CSS file?",
    onState: abortOnState,
  })

  if (!response.updateTailwindConfig) {
    return
  }

  // If globalCssPath is not provided, prompt the user for it
  const { globalCssPath: resolvedGlobalCssPath } = opts.globalCssPath
    ? { globalCssPath: opts.globalCssPath }
    : await prompts({
        type: "text",
        name: "globalCssPath",
        message: "What is the path to your global CSS file? (e.g., src/index.css, src/app/globals.css)",
        initial: "src/index.css",
        validate: async (value: string) => {
          if (!value || value.trim().length === 0) {
            return "Please provide a path to your global CSS file"
          }
          const fullPath = resolve(projectPath, value)
          if (!(await exists(fullPath))) {
            return `File not found: ${value}`
          }
          return true
        },
        onState: abortOnState,
      })

  const cssFilePath = join(projectPath, resolvedGlobalCssPath)
  const themeFilePath = join(subframeDirPath, TAILWIND_CSS_EXPORT_FILENAME)
  let relativeThemeImportPath = posixJoin(
    relative(dirname(cssFilePath), dirname(themeFilePath)),
    TAILWIND_CSS_EXPORT_FILENAME,
  )

  // Ensure the path starts with ./ or ../ for proper relative imports
  if (!relativeThemeImportPath.startsWith(".")) {
    relativeThemeImportPath = `./${relativeThemeImportPath}`
  }

  let cssContent: string
  try {
    cssContent = await readFile(cssFilePath, "utf-8")
  } catch (error) {
    console.log()
    console.log(
      `Could not read CSS file at ${resolvedGlobalCssPath}. Please manually add the following import to your CSS file:`,
    )
    console.log(`@import "${relativeThemeImportPath}";`)
    console.log()
    return
  }

  const updatedContent = addThemeImportToCss(cssContent, relativeThemeImportPath)

  if (updatedContent !== cssContent) {
    await writeFile(cssFilePath, updatedContent, "utf-8")
  }
}
