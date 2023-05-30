import pkg from './package.json' assert { type: 'json' }

const main = './src/index.js'
const utils = './src/utils/index.js'
const schemas = './src/schemas/index.js'
const errors = './src/errors/index.js'

const external = Object.keys(pkg.dependencies)

export default [
  {
    input: main,
    external,
    output: [
      { file: pkg.exports['.'].require, format: 'cjs' },
      { file: pkg.exports['.'].import, format: 'esm' },
    ],
  },
  {
    input: utils,
    external,
    output: [
      { file: pkg.exports['./utils.js'].require, format: 'cjs' },
      { file: pkg.exports['./utils.js'].import, format: 'esm' },
    ],
  },
  {
    input: schemas,
    external,
    output: [
      { file: pkg.exports['./schemas.js'].require, format: 'cjs' },
      { file: pkg.exports['./schemas.js'].import, format: 'esm' },
    ],
  },
  {
    input: errors,
    external,
    output: [
      { file: pkg.exports['./errors.js'].require, format: 'cjs' },
      { file: pkg.exports['./errors.js'].import, format: 'esm' },
    ],
  },
]
