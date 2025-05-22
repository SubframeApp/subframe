import { Command } from "@commander-js/extra-typings"
import { oraPromise } from "ora"
import { OutputChunk } from "rollup"
import { OutputAsset } from "rollup"
import { v4 } from "uuid"
import { build, type InlineConfig } from "vite"
import { getAccessToken } from "./access-token"
import { apiUploadComponentFiles } from "./api-endpoints"

export const buildCommand = new Command()
  .name("build")
  .description("Builds your subframe bundle")
  .option("--entrypoint <path>", "path to the entrypoint of your subframe bundle")

buildCommand.action(async (opts) => {
  const { entrypoint } = opts

  if (!entrypoint) {
    console.error("Error: --entrypoint is required")
    process.exit(1)
  }

  try {
    const viteConfig: InlineConfig = {
      logLevel: "warn",
      build: {
        lib: {
          entry: entrypoint,
          formats: ["es"],
          fileName: "subframe-bundle",
          name: "BYOC",
        },
        emptyOutDir: false,
        cssCodeSplit: false,
        write: false,
        rollupOptions: {
          external: ["react", "react-dom"],
        },
      },
    }

    // TODO: Clean up the types and finding of the .js and .css files
    const buildResultArray = (await build(viteConfig)) as unknown as [
      { output: [OutputChunk, ...(OutputChunk | OutputAsset)[]] },
    ]
    if (!Array.isArray(buildResultArray)) {
      throw new Error("Build result is not an array")
    }

    const buildResult = buildResultArray[0].output

    const accessToken = await getAccessToken()

    // Get the built files from memory
    const jsOutput = buildResult.find(
      (file) => file.type === "chunk" && file.fileName.endsWith(".mjs"),
    )! as unknown as OutputChunk
    const cssOutput = buildResult.find(
      (file) => file.type === "asset" && file.fileName.endsWith(".css"),
    )! as unknown as OutputAsset

    if (!jsOutput || !cssOutput) {
      throw new Error("Build output missing required files")
    }

    await oraPromise(
      apiUploadComponentFiles({
        token: accessToken,
        // TODO: Support setting projectId from local settings or CLI args
        id: v4(),
        files: [
          {
            contentType: "text/javascript",
            base64EncodedData: Buffer.from(jsOutput.code).toString("base64"),
            name: jsOutput.fileName,
          },
          {
            contentType: "text/css",
            base64EncodedData: Buffer.from(cssOutput.source).toString("base64"),
            name: cssOutput.fileName,
          },
        ],
      }),
      {
        text: "Uploading components",
        failText: "Failed to upload components to Subframe",
      },
    )
  } catch (error) {
    console.error(`Error building bundle:`, error)
    process.exit(1)
  }
})
