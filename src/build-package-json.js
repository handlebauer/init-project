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
        ava: {
          eslintConfig: {
            extends: '@hbauer/eslint-config',
          },
        },
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
          '.': {
            types: './lib/index.d.ts',
            import: './lib/index.mjs',
            require: './lib/index.cjs',
          },
          './utils.js': {
            types: './lib/utils/index.d.ts',
            import: './lib/utils/index.mjs',
            require: './lib/utils/index.cjs',
          },
          './schemas.js': {
            types: './lib/schemas/index.d.ts',
            import: './lib/schemas/index.mjs',
            require: './lib/schemas/index.cjs',
          },
          './errors.js': {
            types: './lib/errors/index.d.ts',
            import: './lib/errors/index.mjs',
            require: './lib/errors/index.cjs',
          },
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
        ava: {
          require: ['dotenv/config'],
        },
        prettier: '@hbauer/prettier-config',
        eslintConfig: {
          extends: '@hbauer/eslint-config',
        },
        scripts: {
          build: 'rollup -c',
          types: 'tsc -p jsconfig.json',
          clean: 'shx rm -rf ./lib',
          prepublishOnly: 'npm run clean && npm run types && npm run build',
          test: 'ava',
        },
      }
