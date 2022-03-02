export const buildPackageJson = ({ name, version, user, repo }) => ({
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
    build: 'shx rm -rf ./types ./lib && rollup -c && tsc -p jsconfig.json',
    test: 'ava',
    prepublishOnly: 'npm run build',
  },
})
