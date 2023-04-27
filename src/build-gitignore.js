export const buildGitignore = lerna =>
  lerna
    ? ``
    : `node_modules
lib
types

.env

npm-debug.log*
npm-error.log*
yarn-debug.log*
yarn-error.log*

.DS_STORE`
