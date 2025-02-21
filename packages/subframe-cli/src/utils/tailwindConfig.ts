import { join } from "node:path"
import { TAILWIND_CONFIG_SUFFIXES } from "../constants"
import { exists } from "./fs"

const TAILWIND_CONFIG_FILENAME = "tailwind.config" as const

export async function getUsedTailwindConfigType(
  path: string,
): Promise<(typeof TAILWIND_CONFIG_SUFFIXES)[number] | undefined> {
  const usedSuffix = (
    await Promise.all(
      TAILWIND_CONFIG_SUFFIXES.map(async (suffix) => {
        const fileExists = await exists(join(path, `${TAILWIND_CONFIG_FILENAME}.${suffix}`))
        return fileExists ? suffix : undefined
      }),
    )
  ).filter((suffix) => Boolean(suffix))
  if (usedSuffix.length === 0) {
    return undefined
  }

  return usedSuffix[0]
}
