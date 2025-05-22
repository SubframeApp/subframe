import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: process.env.NODE_ENV === "development",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      { 
        dir: "dist/esm",
        format: "esm",
        sourcemap: process.env.NODE_ENV === "development",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
]; 