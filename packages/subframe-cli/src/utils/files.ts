import { IGNORE_UPDATE_KEYWORD } from "@subframe/shared/constants"
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { isDirectory } from "./fs"

export function isFileContentsWriteable(contents: string | Buffer): boolean {
  return contents.indexOf(IGNORE_UPDATE_KEYWORD) < 0
}

export async function getAllAbsFilePaths(directoryPath: string): Promise<string[]> {
  const childrenFiles = await readdir(directoryPath)
  const allFiles: string[][] = await Promise.all(
    childrenFiles.map(async (file) => {
      const absPath = join(directoryPath, file)
      if (await isDirectory(absPath)) {
        return getAllAbsFilePaths(absPath)
      } else {
        return [absPath]
      }
    }),
  )

  return allFiles.flat()
}
