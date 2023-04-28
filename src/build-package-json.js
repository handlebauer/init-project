export const buildPackageJson = ({ name, version, user, repo, express }) =>
  express
    ? {
        name,
        version,
        type: 'module',
        main: './src/index.js',
        author: 'Donald Geddes',
        licence: 'MIT',
        repository: `https://github.com/${user}/${repo}.git`,
        prettier: '@hbauer/prettier-config',
        eslintConfig: {
          extends: '@hbauer/eslint-config',
        },
        scripts: {
          dev: 'nodemon -r dotenv/config src/index.js',
          start: 'node -r dotenv/config src/index.js',
        },
      }
    : {
        name,
        version,
        type: 'module',
        exports: {
          import: './lib/index.mjs',
          require: './lib/index.cjs',
        },
        module: './lib/index.mjs',
        main: './lib/index.cjs',
        types: 'types/index.d.ts',
        files: ['lib', 'types'],
        author: 'Donald Geddes',
        licence: 'MIT',
        repository: `https://github.com/${user}/${repo}.git`,
        publishConfig: {
          access: 'public',
        },
        prettier: '@hbauer/prettier-config',
        eslintConfig: {
          extends: '@hbauer/eslint-config',
        },
        scripts: {
          build: 'shx rm -rf ./lib && rollup -c',
          types: 'shx rm -rf ./types && tsc -p jsconfig.json',
          prepublishOnly: 'npm run types && npm run build',
          test: 'ava',
        },
      }
