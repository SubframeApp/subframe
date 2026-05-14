import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { oraPromise } from "ora"
import { ensureIsValidCodeGenFile, isCodeGenFileValid } from "shared/code-gen-type-helpers"
import { COMPONENT_WRAPPER_FILENAME, IGNORE_UPDATE_KEYWORD } from "shared/constants"
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
   * Migrating the old flat layout into per-component directories. A component that previously
   * synced as `components/Button.tsx` now syncs as `components/Button/Button.tsx`; without this
   * the stale flat file lingers and wins Node module resolution over the new directory.
   */
  const migratedSyncDisabledFiles: string[] = []
  await Promise.all(
    validDefinitionFiles.map(async ({ file, folderName }) => {
      // Only the per-component directory layout (nested folderName) supersedes a flat file, and
      // the wrapper index.tsx is new in this layout so it never had a flat predecessor.
      if (!folderName.includes("/") || file.fileName === COMPONENT_WRAPPER_FILENAME) {
        return
      }
      const flatPath = join(syncDirectory, dirname(folderName), file.fileName)
      let contents: Buffer
      try {
        contents = await readFile(flatPath)
      } catch {
        return // no stale flat file for this component
      }

      if (isFileContentsWriteable(contents)) {
        // Not sync-disabled — the freshly generated nested files replace it.
        return rm(flatPath)
      }

      // Sync-disabled: preserve the user's file by moving it unchanged to the new nested path.
      // It stays sync-disabled, so the scan below ignores it and the server's generated file is
      // skipped — the user's file keeps winning.
      const newPath = join(syncDirectory, folderName, file.fileName)
      await mkdir(dirname(newPath), { recursive: true })
      await rename(flatPath, newPath)
      migratedSyncDisabledFiles.push(newPath)
    }),
  )

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

  if (migratedSyncDisabledFiles.length) {
    await cliLogger.trackWarningAndFlush("[CLI]: migrated sync-disabled files to component directories", {
      files: migratedSyncDisabledFiles.join(", "),
      truncatedProjectId: projectInfo.truncatedProjectId,
    })
    console.log(
      warning(
        `The following sync-disabled files were moved into per-component directories:\n` +
          migratedSyncDisabledFiles.map((file) => `  ${file}`).join("\n") +
          `\nTheir relative imports may now be at the wrong depth (e.g. "../utils" needs to become "../../utils") — please review them.\n`,
      ),
    )
  }
}
