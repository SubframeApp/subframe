import { Command } from "@commander-js/extra-typings"
import { oraPromise } from "ora"
import { OutputChunk } from "rollup"
import { OutputAsset } from "rollup"
import { getLibraryName, getScopedCSSClassName } from "shared/byoc-helpers"
import { COMMAND_PROJECT_ID_KEY_SHORT } from "shared/constants"
import { COMMAND_PROJECT_ID_KEY } from "shared/constants"
import { ComponentFilesUploadRequest } from "shared/types"
import { v4 } from "uuid"
import { build, type InlineConfig, type Plugin } from "vite"
import { getAccessToken } from "./access-token"
import { apiUploadComponentFiles } from "./api-endpoints"
import { localSyncSettings } from "./common"

function scopeCssAdapter({ id }: { id: string }): Plugin {
  return {
    name: "scope-css-adapter",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === "asset" && file.fileName.endsWith(".css")) {
          const raw = file.source.toString()
          // TODO: Handle :root { } -> .registry-${id} { }
          file.source = `@scope(.${getScopedCSSClassName(id)}) {${raw}}`
        }
      }
    },
  }
}

export const buildCommand = new Command()
  .name("build")
  .description("Builds your subframe bundle")
  .requiredOption("--entrypoint <path>", "path to the entrypoint of your subframe bundle")
  .option(`${COMMAND_PROJECT_ID_KEY_SHORT}, ${COMMAND_PROJECT_ID_KEY} <projectId>`, "project id to run build for")

buildCommand.action(async (opts) => {
  const { entrypoint, projectId } = opts
  const id = v4()
  try {
    const viteConfig: InlineConfig = {
      logLevel: "warn",
      configFile: false,
      plugins: [scopeCssAdapter({ id })],
      build: {
        lib: {
          entry: entrypoint,
          formats: ["umd"],
          fileName: "subframe-bundle",
          name: getLibraryName(id),
        },
        emptyOutDir: false,
        cssCodeSplit: false,
        write: false,
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "jsxRuntime",
              "react/jsx-dev-runtime": "jsxDevRuntime",
            },
          },
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
    console.log(buildResult)

    const accessToken = await getAccessToken()
    const truncatedProjectId = projectId || localSyncSettings?.projectId

    // Get the built files from memory
    const jsOutput = buildResult.find(
      (file) => file.type === "chunk" && file.fileName.endsWith(".js"),
    )! as unknown as OutputChunk

    const cssOutput = buildResult.find(
      (file) => file.type === "asset" && file.fileName.endsWith(".css"),
    )! as unknown as OutputAsset

    if (!jsOutput) {
      throw new Error("Build output missing required files")
    }

    const files: ComponentFilesUploadRequest["files"] = [
      {
        contentType: "text/javascript",
        base64EncodedData: Buffer.from(jsOutput.code).toString("base64"),
        name: jsOutput.fileName,
      },
    ]

    if (cssOutput) {
      files.push({
        contentType: "text/css",
        base64EncodedData: Buffer.from(cssOutput.source).toString("base64"),
        name: cssOutput.fileName,
      })
    }

    await oraPromise(
      apiUploadComponentFiles({
        token: accessToken,
        truncatedProjectId,
        id,
        files,
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
