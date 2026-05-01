import { injectThemeImportIntoGlobals } from "./setup/inject-theme-import"

export { addThemeImportToCss } from "./setup/inject-theme-import"

export async function setupTailwindV4(
  { projectPath, rootPath: subframeDirPath }: { projectPath: string; rootPath: string },
  opts: { globalCssPath?: string; tailwind?: boolean },
) {
  await injectThemeImportIntoGlobals({
    projectPath,
    subframeDirPath,
    globalCssPath: opts.globalCssPath,
    tailwindOptInOverride: opts.tailwind,
  })
}
