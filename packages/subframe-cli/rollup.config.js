
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import esbuild from "rollup-plugin-esbuild"

import packageJson from './package.json' with {type: "json"}

/**@type {import("rollup").RollupOptions[]} */
const rollupOptions = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.bin["init-main"],
        inlineDynamicImports: true,
        format: "esm",
      },
    ],
    external: [/node_modules/, "!node_modules/@subframe/shared"],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      replace({
        "process.env.SEGMENT_WRITE_KEY": JSON.stringify(process.env.SEGMENT_WRITE_KEY),
        preventAssignment: true,
      }),
      esbuild({
        tsconfig: "./tsconfig.json",
        loaders: {
          ".json": "json",
        },
        minify: process.env.NODE_ENV === "production",
      }),
    ],
  },
]

export default rollupOptions
