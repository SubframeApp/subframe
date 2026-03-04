import { Command } from "@commander-js/extra-typings"
import { readFile } from "node:fs/promises"
import { oraPromise } from "ora"
import { COMMAND_AUTH_TOKEN_KEY, COMMAND_AUTH_TOKEN_KEY_SHORT } from "shared/constants"
import { TruncatedProjectId } from "shared/types"
import { getAccessToken, verifyTokenWithOra } from "./access-token"
import { apiCreateImportSession, apiStartImport, uploadToPresignedUrl } from "./api-endpoints"
import { localSyncSettings } from "./common"
import { storeToken } from "./config"
import { resolveManifest } from "./import-manifest"
import { makeCLILogger } from "./logger/logger-cli"
import { success } from "./output/format"

const PAYLOAD_SIZE_LIMIT = 50 * 1024 * 1024 // 50MB

export const importCommand = new Command()
  .name("import")
  .description("imports a design system into Subframe")
  .requiredOption("-p, --project-id <projectId>", "Subframe project ID")
  .requiredOption("-m, --manifest <path>", "path to import manifest JSON")
  .option(`${COMMAND_AUTH_TOKEN_KEY_SHORT}, ${COMMAND_AUTH_TOKEN_KEY} <auth-token>`, "auth token to use")
  .action(async (opts) => {
    const cliLogger = makeCLILogger()

    try {
      let accessToken = opts.authToken
      if (accessToken) {
        const tokenWithTeam = await verifyTokenWithOra(cliLogger, accessToken)
        if (!tokenWithTeam) {
          throw new Error("Failed to authenticate with provided token")
        }
        await storeToken(cliLogger, tokenWithTeam)
      } else {
        const tokenWithTeam = await getAccessToken(cliLogger, { teamId: localSyncSettings?.teamId })
        accessToken = tokenWithTeam.token
      }

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
    } catch (err: any) {
      await cliLogger.trackWarningAndFlush("[CLI]: import uncaught error", { error: err.toString() })
      console.error(err)
      process.exit(1)
    }
  })
