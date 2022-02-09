#!/usr/bin/env zx

import { $, question, fs, path, cd } from 'zx'

import { defaultModules } from '@hbauer/init-project/src/default-modules.js'
import { defaultGitignore } from '@hbauer/init-project/src/default-gitignore.js'
import { defaultRollupConfig } from '@hbauer/init-project/src/default-rollup-config.js'
import { defaultTest } from '@hbauer/init-project/src/default-test.js'

import { buildPackageJson } from '@hbauer/init-project/src/build-package-json.js'

const cwd = process.cwd()

console.log(`
================================
      Create a new package      
================================
`)

// Construct dynamic package.json fields
const packageName = await question(' => Package name: ')
const user =
  (await question(' => User/Organization name: ')) ||
  process.env.GITHUB_USER ||
  ''

const parts = packageName.split('/')
const scope = parts.length === 2 && parts[0]

const respositoryName = scope ? parts[1] : packageName

const repository = `https://github.com/${user}/${respositoryName}.git`

// Build package.json
const packageJson = buildPackageJson({ name: packageName, repository })

// Create new directory
await $`mkdir ${respositoryName}`
await cd(respositoryName)

// Create empty index.js
await $`mkdir src`
await $`touch src/index.js`

// Initialize git
await $`git init`

// Write default files
const pathTo = to => path.join(cwd, respositoryName, to)

fs.writeFileSync(pathTo('package.json'), JSON.stringify(packageJson, null, 2))
fs.writeFileSync(pathTo('.gitignore'), defaultGitignore)
fs.writeFileSync(pathTo('rollup.config.js'), defaultRollupConfig)
fs.writeFileSync(pathTo('src/test.js'), defaultTest)

// Finish up
$`yarn add -D ${defaultModules}`
