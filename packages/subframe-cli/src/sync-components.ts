import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { oraPromise } from "ora"
import { IGNORE_UPDATE_KEYWORD } from "shared/constants"
import { apiSyncProject } from "./api-endpoints"
import { warning } from "./output/style"
import { getAllAbsFilePaths, isFileContentsWriteable } from "./utils/files"

export async function syncComponents({
  // Note: An empty array means sync all components
  components,
  projectId,
  accessToken,
  importAlias,
  syncDirectory,
  cssType,
}: {
  components: string[]
  projectId: string | undefined
  accessToken: string
  importAlias: string
  syncDirectory: string
  cssType: "tailwind" | "tailwind-v4"
}) {
  const { definitionFiles, otherFiles, errorComponents } = await oraPromise(
    apiSyncProject({
      token: accessToken,
      truncatedProjectId: projectId,
      components,
      importAlias,
      cssType,
    }),
    {
      text: "Syncing Subframe components",
      failText: "Failed to sync Subframe components",
    },
  )

  if (errorComponents.length) {
    console.log(warning(`The following components were not found: ${errorComponents.join(", ")}\n`))
  }

  console.log(
    `Tip: You can ignore any updates for a specific file by adding the following comment anywhere in the file:\n// ${IGNORE_UPDATE_KEYWORD}\n`,
  )

  // Ensure the root folder exists in case they deleted it.
  await mkdir(syncDirectory, { recursive: true })

  /**
   * Making map of files to write
   */
  const filesToWrite: { [absFilePath: string]: string } = {}
  definitionFiles.forEach(({ file, folderName }) => {
    filesToWrite[join(syncDirectory, folderName, file.fileName)] = file.contents
  })
  otherFiles.forEach((file) => {
    filesToWrite[join(syncDirectory, file.fileName)] = file.contents
  })

  /**
   * Removing all existing files and making map of files to ignore
   */
  const allAbsFilePaths = await getAllAbsFilePaths(syncDirectory)
  const fileAbsPathsToIgnore = new Set<string>()
  await Promise.all(
    allAbsFilePaths.map(async (fileName) => {
      const file = await readFile(fileName)

      if (!isFileContentsWriteable(file)) {
        fileAbsPathsToIgnore.add(fileName)
        console.log(`Ignoring file: ${fileName}`)
      } else if (filesToWrite[fileName] && filesToWrite[fileName] === file.toString()) {
        // No changes, so can ignore
        fileAbsPathsToIgnore.add(fileName)
      } else if (!components.length) {
        // when generating all, we clear out the directory
        return rm(fileName)
      }
    }),
  )

  /**
   * Writing the files with changes
   */
  await Promise.all(
    Object.entries(filesToWrite).map(async ([absFilePath, contents]) => {
      if (fileAbsPathsToIgnore.has(absFilePath)) {
        return null
      }

      // make the directory, if it doesn't exist yet
      await mkdir(dirname(absFilePath), { recursive: true })

      return writeFile(absFilePath, contents)
    }),
  )
}
