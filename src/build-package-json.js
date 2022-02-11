export const buildPackageJson = ({ name, user, repo }) => ({
  name,
  version: '0.0.0',
  type: 'module',
  exports: {
    import: './lib/index.mjs',
    require: './lib/index.cjs',
  },
  module: './lib/index.mjs',
  main: './lib/index.cjs',
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
    test: 'ava',
    prepublishOnly: 'npm run build',
  },
})
