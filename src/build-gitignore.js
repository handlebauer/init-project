const defaultIgnore = `node_modules
lib
types

.env

npm-debug.log*
npm-error.log*
yarn-debug.log*
yarn-error.log*

.DS_STORE`

const expressIgnore = `node_modules
types

.env

npm-debug.log*
npm-error.log*
yarn-debug.log*
yarn-error.log*

.DS_STORE`

export const buildGitignore = lerna => {
  if lerna {
    return ''
  }
  if express {
    return expressIgnore
  }
  return defaultIgnore
}
