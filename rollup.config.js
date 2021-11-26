import * as path from 'path'

import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'

import packageJson from './package.json'

const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  /^fp-ts\//,
  /^io-ts\//,
]

export default [
  {
    input: path.join(__dirname, 'src', 'index.ts'),
    output: [
      {
        name: 'ResolveCloudSDK',
        file: path.join(__dirname, 'lib', 'index.es.js'),
        format: 'es',
        sourcemap: true,
      },
      {
        name: 'ResolveCloudSDK',
        file: path.join(__dirname, 'lib', 'index.cjs.js'),
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        preventAssignment: true,
      }),
      typescript({
        module: 'esnext',
        lib: ['es5', 'es6', 'dom'],
        target: 'es5',
        outputToFilesystem: false,
        sourceMap: true,
        inlineSources: true,
      }),
    ],
    external,
  },
]
