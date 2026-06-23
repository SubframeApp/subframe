import { Command } from "@commander-js/extra-typings"
import { readFile } from "node:fs/promises"
import { oraPromise } from "ora"
import { COMMAND_AUTH_TOKEN_KEY, COMMAND_AUTH_TOKEN_KEY_SHORT } from "shared/constants"
import { TruncatedProjectId } from "shared/types"
import { resolveAccessToken } from "./access-token"
import { apiCreateImportSession, apiStartImport, uploadToPresignedUrl } from "./api-endpoints"
import { localSyncSettings } from "./common"
import { resolveManifest } from "./import-manifest"
import { success } from "./output/format"
import { runCommand } from "./run-command"

const PAYLOAD_SIZE_LIMIT = 50 * 1024 * 1024 // 50MB

export const importCommand = new Command()
  .name("import")
  .description("imports a design system into Subframe")
  .requiredOption("-p, --project-id <projectId>", "Subframe project ID")
  .requiredOption("-m, --manifest <path>", "path to import manifest JSON")
  .option(`${COMMAND_AUTH_TOKEN_KEY_SHORT}, ${COMMAND_AUTH_TOKEN_KEY} <auth-token>`, "auth token to use")
  .action(async (opts) =>
    runCommand("import", async (cliLogger) => {
      const { token: accessToken } = await resolveAccessToken(cliLogger, {
        authTokenFlag: opts.authToken,
        teamId: localSyncSettings?.teamId,
      })

      const manifestRaw = await readFile(opts.manifest, "utf8")
      let manifestParsed: unknown
      try {
        manifestParsed = JSON.parse(manifestRaw)
      } catch {
        throw new Error(`Failed to parse manifest JSON at ${opts.manifest}`)
      }

      const payload = await oraPromise(resolveManifest(manifestParsed), {
        text: "Reading manifest files",
        successText: "All files read",
        failText: "Failed to read manifest files",
      })

      const payloadJson = JSON.stringify(payload)
      if (payloadJson.length > PAYLOAD_SIZE_LIMIT) {
        throw new Error(`Import payload exceeds 50MB limit`)
      }

      const { sessionId, presignedUrl } = await oraPromise(
        apiCreateImportSession(accessToken, {
          truncatedProjectId: opts.projectId as TruncatedProjectId,
        }),
        {
          text: "Creating import session",
          successText: "Import session created",
          failText: "Failed to create import session",
        },
      )

      await oraPromise(uploadToPresignedUrl(presignedUrl, payloadJson), {
        text: "Uploading design system",
        successText: "Upload complete",
        failText: "Failed to upload design system",
      })

      await oraPromise(
        apiStartImport(accessToken, {
          truncatedProjectId: opts.projectId as TruncatedProjectId,
          sessionId,
        }),
        {
          text: "Starting import",
          successText: "Import started",
          failText: "Failed to start import",
        },
      )

      console.log(`\n  ${success("Design system uploaded. Import is now in progress.")}`)

      return { projectId: opts.projectId, sessionId }
    }),
  )
