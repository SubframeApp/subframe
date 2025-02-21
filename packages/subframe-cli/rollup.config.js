import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import typescript from "rollup-plugin-typescript2"
import "dotenv/config"

const packageJson = require("./package.json")

/**@type {import("rollup").RollupOptions[]} */
const rollupOptions = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.bin.main,
        inlineDynamicImports: true,
        format: "esm",
      },
    ],
    external: [/node_modules/],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      json(),
      resolve({
        preferBuiltins: true,
        exportConditions: ["node", "default"],
      }),
      terser(),
      replace({
        "process.env.SEGMENT_WRITE_KEY": JSON.stringify(process.env.SEGMENT_WRITE_KEY),
        preventAssignment: true,
      }),
    ],
  },
]

export default rollupOptions
