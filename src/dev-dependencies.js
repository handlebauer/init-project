export const devDependencies = express =>
  express
    ? [
        'dotenv',
        'nodemon',
        'husky',
        'prettier',
        '@hbauer/prettier-config',
        'eslint',
        '@hbauer/eslint-config',
        '@types/node',
        '@types/express',
      ]
    : [
        'dotenv',
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
