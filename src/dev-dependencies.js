export const devDependencies = express =>
  express
    ? [
        'nodemon',
        'husky',
        'prettier',
        '@hbauer/prettier-config',
        'eslint',
        '@hbauer/eslint-config',
        '@types/node',
      ]
    : [
        'typescript',
        'shx',
        'rollup',
        'ava',
        'husky',
        'prettier',
        '@hbauer/prettier-config',
        'eslint',
        '@hbauer/eslint-config',
        '@types/node',
      ]
