import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import preserveDirectives from "rollup-plugin-preserve-directives"
import typescript from "rollup-plugin-typescript2"

/** @type {import("rollup").InputOptions} */

// All low level component library packages like radix-ui/* are now peer dependencies.
// However, we still need packages like style-inject to be bundled in this manner as they are imported from CSS files
function makeEntryFileNames(ext) {
  return (chunkInfo) => {
    if (chunkInfo.name.includes("node_modules")) {
      return chunkInfo.name.replace(/node_modules/g, "external") + ext
    }
    return "[name]" + ext
  }
}

const sharedConfig = {
  sourcemap: process.env.NODE_ENV === "development",
  preserveModules: true,
  // taken from https://github.com/rollup/rollup/issues/3684#issuecomment-1535836196
  // ensures that node_modules is properly preserved / bundled
  preserveModulesRoot: "src",
}

export default {
  input: "src/index.ts",
  output: [
    {
      ...sharedConfig,
      dir: "dist/cjs",
      format: "cjs",
      entryFileNames: makeEntryFileNames(".cjs"),
      chunkFileNames: makeEntryFileNames(".cjs"),
      exports: "named",
    },
    {
      ...sharedConfig,
      dir: "dist/esm",
      format: "esm",
      entryFileNames: makeEntryFileNames(".mjs"),
      chunkFileNames: makeEntryFileNames(".mjs"),
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    postcss({
      modules: true,
      inject: { insertAt: "top" },
    }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    preserveDirectives.default(),
  ],
  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes(`use client`)) {
      return
    }
    warn(warning)
  },
}
