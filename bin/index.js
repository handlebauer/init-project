#!/usr/bin/env zx

import { $, question, fs, path, cd } from 'zx'

import {
  GITHUB_USER_NAME,
  NPM_SCOPE,
} from '@hbauer/init-project/src/constants.js'

import { defaultModules } from '@hbauer/init-project/src/default-modules.js'
import { defaultGitignore } from '@hbauer/init-project/src/default-gitignore.js'
import { defaultRollupConfig } from '@hbauer/init-project/src/default-rollup-config.js'
import { defaultTest } from '@hbauer/init-project/src/default-test.js'

import { buildPackageJson } from '@hbauer/init-project/src/build-package-json.js'

const cwd = process.cwd()
const pathTo = to => path.join(cwd, to)

console.log(`
========================
  Create a new package 
========================
`)

// Construct dynamic package.json fields
const packageName = await question(' => Package name: ')
const respositoryName = packageName.startsWith(NPM_SCOPE)
  ? packageName.slice(NPM_SCOPE.length + 1)
  : packageName
const repository = `https://github.com/${GITHUB_USER_NAME}/${respositoryName}.git`

// Build package.json
const packageJson = buildPackageJson({ name: packageName, repository })

// Create new directory
await $`mkdir ${packageName}`
await cd(packageName)

// Create empty index.js
await $`mkdir src`
await $`touch src/index.js`

// Initialize git
await $`git init`

// Write default files
fs.writeFileSync(pathTo('package.json'), JSON.stringify(packageJson, null, 2))
fs.writeFileSync(pathTo('.gitignore'), defaultGitignore)
fs.writeFileSync(pathTo('rollup.config.js'), defaultRollupConfig)
fs.writeFileSync(pathTo('src/test.js'), defaultTest)

// Finish up
$`yarn add -D ${defaultModules}`
