import { assign, parse, stringify } from "comment-json"
import detectIndent from "detect-indent"
import { readFile, writeFile } from "node:fs/promises"

/** Check whether the provided tsconfig.json file has the provided aliases configured */
export async function hasAliasSetup(tsConfigPath: string, aliases: Record<string, string[]>): Promise<boolean> {
  try {
    const tsConfig = await readFile(tsConfigPath, "utf-8")

    const parsed = parse(tsConfig)

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Could not parse tsconfig.json, invalid config file")
    }

    const compilerOptions =
      "compilerOptions" in parsed && typeof parsed.compilerOptions === "object" && parsed.compilerOptions !== null
        ? parsed.compilerOptions
        : {}
    const paths =
      "paths" in compilerOptions && typeof compilerOptions.paths === "object" && compilerOptions.paths !== null
        ? (compilerOptions.paths as Record<string, string[]>)
        : {}

    return Object.keys(aliases).every((alias) => {
      if (!(alias in paths)) {
        return false
      }

      const aliasPaths = paths[alias] || []
      return aliasPaths.length === aliases[alias].length
    })
  } catch (e) {
    return false
  }
}

/**
 * Adds aliases to the provided tsconfig.json file
 */
export async function addAliasesToTSConfig(tsConfigPath: string, aliases: Record<string, string[]>) {
  try {
    const tsConfig = await readFile(tsConfigPath, "utf-8")
    const indent = detectIndent(tsConfig).indent || 2
    const parsed = parse(tsConfig)

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Could not parse tsconfig.json, invalid config file")
    }

    const compilerOptions =
      "compilerOptions" in parsed && typeof parsed.compilerOptions === "object" && parsed.compilerOptions !== null
        ? parsed.compilerOptions
        : {}

    const updated = assign(parsed, {
      compilerOptions: assign(compilerOptions, {
        paths: assign("paths" in compilerOptions ? compilerOptions.paths : {}, aliases),
      }),
    })

    await writeFile(tsConfigPath, stringify(updated, null, indent))
  } catch (e) {
    const warningMessage = ["Subframe could not automatically configure your tsconfig.json"].join("\n")
    console.warn(warningMessage)
  }
}
