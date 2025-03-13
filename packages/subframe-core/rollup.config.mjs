import nodeResolve from "@rollup/plugin-node-resolve"
import esbuild from "rollup-plugin-esbuild"
import postcss from "rollup-plugin-postcss"
import { preserveDirectives } from "rollup-plugin-preserve-directives"

/** @type {import("rollup").InputOptions} */

const sharedConfig = {
  exports: "named",
  sourcemap: process.env.NODE_ENV === "development",
  preserveModules: true,
  preserveModulesRoot: "src",
}

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      ...sharedConfig,
    },
    {
      dir: "dist/esm",
      format: "esm",
      ...sharedConfig,
    },
  ],
  external: [/node_modules/],
  plugins: [
    nodeResolve(),
    postcss({
      modules: true,
      inject: { insertAt: "top" },
      inject(cssVariableName) {
        return `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`
      },
    }),
    esbuild({
      tsconfig: "tsconfig.json",
      minify: process.env.NODE_ENV === "production",
      sourceMap: sharedConfig.sourcemap,
    }),
    preserveDirectives(),
  ],
  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes(`use client`)) {
      return
    }
    warn(warning)
  },
}
