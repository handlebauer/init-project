export const devDependencies = express =>
  express
    ? [
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
