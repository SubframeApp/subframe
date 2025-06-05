import { Command } from "@commander-js/extra-typings"
import { oraPromise } from "ora"
import postcss from "postcss"
import selectorParser from "postcss-selector-parser"
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
  const scopedClass = getScopedCSSClassName(id)

  return {
    name: "scope-css-adapter",
    apply: "build",
    enforce: "post",

    async generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (!(file.type === "asset" && file.fileName.endsWith(".css"))) continue

        const rootDecls: postcss.Declaration[] = []
        const root = postcss.parse(file.source.toString())

        root.walkRules((rule) => {
          const keep: string[] = []

          selectorParser((sel) => {
            sel.each((selector) => {
              const hasRoot = selector.some((n) => n.type === "pseudo" && n.value === ":root")
              const hasAttribute = selector.some((n) => n.type === "attribute")

              // Handle selectors with attributes (but not :root) - transform to :scope[attr]
              if (hasAttribute && !hasRoot) {
                // Replace the entire selector with :scope + original selector
                keep.push(`:scope${selector.toString()}`)
                return
              }

              // Handle :root selectors
              if (!hasRoot) {
                keep.push(selector.toString())
                return
              }

              const onlyRoot = selector.nodes.every((n) => n.type === "pseudo" && n.value === ":root")
              if (onlyRoot) {
                rootDecls.push(
                  ...rule.nodes.filter((n): n is postcss.Declaration => n.type === "decl").map((n) => n.clone()),
                )
                return
              }

              // Handle complex :root selectors (like :root[data-theme="light"])
              selector.nodes = selector.nodes.filter((n) => !(n.type === "pseudo" && n.value === ":root"))
              keep.push(selector.toString())
            })
          }).processSync(rule.selector)

          if (keep.length) {
            rule.selector = keep.join(", ")
          } else {
            rule.remove()
          }
        })

        let output = `@scope(.${scopedClass}) {
${root.toString()}
}`

        // Only add root declarations if they exist
        if (rootDecls.length > 0) {
          const mergedRoot = postcss.rule({ selector: `.${scopedClass}` })
          mergedRoot.append(rootDecls)
          output += `

${mergedRoot.toString()}`
        }

        file.source = output
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
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env": "{}",
      },
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
