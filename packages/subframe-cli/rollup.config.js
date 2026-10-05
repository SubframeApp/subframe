import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import { sentryRollupPlugin } from "@sentry/rollup-plugin"
import typescript from "rollup-plugin-typescript2"

const packageJson = require("./package.json")

const sentryRelease = `subframe-cli@${packageJson.version}`

/**@type {import("rollup").RollupOptions[]} */
const rollupOptions = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        inlineDynamicImports: true,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        inlineDynamicImports: true,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigOverride: { compilerOptions: { sourceMap: true } },
        // rpt2's default include glob breaks with picomatch >= 2.3.2
        include: ["*.ts", "**/*.ts", "*.tsx", "**/*.tsx"],
      }),
      json(),
      resolve({
        preferBuiltins: true,
        exportConditions: ["node", "default"],
      }),
      commonjs(),
      terser(),
      replace({
        "process.env.SEGMENT_WRITE_KEY": JSON.stringify(process.env.SEGMENT_WRITE_KEY),
        "process.env.SENTRY_DSN": JSON.stringify(process.env.SENTRY_DSN),
        "process.env.SENTRY_RELEASE": JSON.stringify(sentryRelease),
        preventAssignment: true,
      }),
      sentryRollupPlugin({
        org: "subframe",
        project: "cli",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        release: { name: sentryRelease },
        // The plugin only logs release and upload failures by default; throw so the build (and publish) stops.
        errorHandler: (err) => {
          throw err
        },
        telemetry: false,
        disable: !process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: { filesToDeleteAfterUpload: ["dist/*.map"] },
      }),
    ],
  },
]

export default rollupOptions
