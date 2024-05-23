import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import external from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const commonjsOptions = {
  include: 'node_modules/**'
}

const rollupConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [/@babel\/runtime/],
  plugins: [
    external(),
    url({ exclude: ['**/*.svg'] }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-transform-runtime']
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs(commonjsOptions)
  ]
}

export default rollupConfig
