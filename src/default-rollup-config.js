export const defaultRollupConfig = `import pkg from './package.json'

const input = './src/index.js'

export default {
  input,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
}
`
