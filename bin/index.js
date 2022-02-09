#!/usr/bin/env zx

import { $, question, fs, path } from 'zx'

import { GITHUB_USER_NAME, NPM_SCOPE } from './constants.js'

import { defaultModules } from './default-modules.js'
import { defaultGitignore } from './default-gitignore.js'
import { defaultRollupConfig } from './default-rollup-config.js'
import { defaultTest } from './default-test.js'

import { buildPackageJson } from './build-package-json.js'

const cwd = process.cwd()
const pathTo = to => path.join(cwd, to)

const name = await question('Package name: ')
const respositoryName = name.startsWith(NPM_SCOPE)
  ? name.slice(NPM_SCOPE.length + 1)
  : name
const repository = `https://github.com/${GITHUB_USER_NAME}/${respositoryName}.git`
const packageJson = buildPackageJson({ name, repository })

await $`mkdir src`
await $`touch src/index.js`

await $`git init`

fs.writeFileSync(pathTo('package.json'), JSON.stringify(packageJson, null, 2))
fs.writeFileSync(pathTo('.gitignore'), defaultGitignore)
fs.writeFileSync(pathTo('rollup.config.js'), defaultRollupConfig)
fs.writeFileSync(pathTo('src/test.js'), defaultTest)

$`yarn add -D ${defaultModules}`
