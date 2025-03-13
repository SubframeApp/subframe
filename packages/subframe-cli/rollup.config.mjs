import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import esbuild from "rollup-plugin-esbuild"
import packageJson from "./package.json" assert { type: "json" }

/**@type {import("rollup").RollupOptions[]} */
const rollupOptions = [
  {
    input: "src/index.ts",
    output: [
      {
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: process.env.NODE_ENV === "development",
        dir: packageJson.main.split("/").slice(0, -1).join("/"),
        format: "esm",
      },
    ],
    external: [/node_modules/],
    plugins: [
      nodeResolve(),
      replace({
        "process.env.SEGMENT_WRITE_KEY": JSON.stringify(process.env.SEGMENT_WRITE_KEY),
        preventAssignment: true,
      }),
      esbuild({
        tsconfig: "tsconfig.json",
        minify: false,
        sourceMap: true,
        loaders: {
          ".json": "json",
        },
      }),
      commonjs(),
    ],
  },
]

export default rollupOptions
