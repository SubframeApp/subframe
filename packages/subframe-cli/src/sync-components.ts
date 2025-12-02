import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { oraPromise } from "ora"
import { ensureIsValidCodeGenFile, isCodeGenFileValid } from "shared/code-gen-type-helpers"
import { IGNORE_UPDATE_KEYWORD } from "shared/constants"
import { SyncProjectResponse, TruncatedProjectId } from "shared/types"
import { apiSyncProject } from "./api-endpoints"
import { CLILogger } from "./logger/logger-cli"
import { highlight, warning } from "./output/format"
import { getAllAbsFilePaths, isFileContentsWriteable } from "./utils/files"

export async function syncComponents({
  cliLogger,
  // Note: An empty array means sync all components
  components,
  projectId,
  accessToken,
  importAlias,
  syncDirectory,
  cssType,
}: {
  cliLogger: CLILogger
  components: string[]
  projectId: TruncatedProjectId | undefined
  accessToken: string
  importAlias: string
  syncDirectory: string
  cssType: "tailwind" | "tailwind-v4"
}) {
  const { definitionFiles, otherFiles, missingComponents, projectInfo } = await oraPromise(
    apiSyncProject(accessToken, {
      truncatedProjectId: projectId,
      components,
      importAlias,
      cssType,
    }),
    {
      text: "Syncing Subframe components",
      successText: (result: SyncProjectResponse) => `Synced components for ${highlight(result.projectInfo.name)}`,
      failText: "Failed to sync Subframe components",
    },
  )

  if (missingComponents.length) {
    await cliLogger.trackWarningAndFlush("[CLI]: sync components not found", {
      components: missingComponents.join(", "),
      truncatedProjectId: projectInfo.truncatedProjectId,
    })
    console.log(
      warning(
        `The following components were not found in ${highlight(projectInfo.name)}: ${missingComponents.join(", ")}\n`,
      ),
    )
  }

  const validDefinitionFiles = definitionFiles.filter(({ file }) => isCodeGenFileValid(file))
  const errorDefinitionFiles = definitionFiles.filter(({ file }) => !isCodeGenFileValid(file))

  if (errorDefinitionFiles.length) {
    const errorFileNames = errorDefinitionFiles.map(({ file }) => file.fileName)
    await cliLogger.trackWarningAndFlush("[CLI]: code gen errors", {
      files: errorFileNames.join(", "),
      truncatedProjectId: projectInfo.truncatedProjectId,
    })
    console.log(warning(`The following components had code generation errors: ${errorFileNames.join(", ")}\n`))
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
  validDefinitionFiles.forEach(({ file, folderName }) => {
    filesToWrite[join(syncDirectory, folderName, file.fileName)] = ensureIsValidCodeGenFile(file).contents
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
