import { exists } from "./fs"
import { join } from "node:path"

const TAILWIND_CONFIG_FILENAMES = ["tailwind.config"]

const CONFIG_SUFFIXES_TS = ["ts", "tsx", "mts", "mtsx", "cts", "ctsx"]
const CONFIG_SUFFIXES_JS = ["js", "jsx", "mjs", "mjsx", "cjs", "cjsx"]

export async function getTailwindConfigPath(cwd: string) {
  for (const fileName of TAILWIND_CONFIG_FILENAMES) {
    for (const tsSuffix of [...CONFIG_SUFFIXES_TS, ...CONFIG_SUFFIXES_JS]) {
      const path = join(cwd, `${fileName}.${tsSuffix}`)
      if (await exists(path)) {
        return path
      }
    }
  }
}
