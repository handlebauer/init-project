export const buildGitignore = lerna =>
  lerna
    ? ``
    : `node_modules
lib
types

yarn-debug.log*
yarn-error.log*

.DS_STORE`
