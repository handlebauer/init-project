#!/usr/bin/env zx

import { $, fs, path, cd } from 'zx'
import Enquirer from 'enquirer'
import { _dirname } from '@hbauer/convenience-functions'

import './src/process-error.js'

import { defaultModules } from './src/default-modules.js'
import { defaultGitignore } from './src/default-gitignore.js'
import { defaultRollupConfig } from './src/default-rollup-config.js'
import { defaultTest } from './src/default-test.js'

import { buildPackageJson } from './src/build-package-json.js'

const cwd = _dirname(import.meta.url)
const enquirer = new Enquirer()

// Ask a couple of questions
const { packageName } = await enquirer.prompt({
  type: 'input',
  name: 'packageName',
  message: 'Package name:',
  initial: '@hbauer/',
  required: true,
})
const { user } = await enquirer.prompt({
  type: 'input',
  name: 'user',
  message: 'GitHub user:',
  initial: 'handlebauer',
  required: true,
})

// Parse answers
const parts = packageName.split('/')
const scope = parts.length === 2 && parts[0]
const respositoryName = scope ? parts[1] : packageName
const repository = `https://github.com/${user}/${respositoryName}.git`

const packageJson = buildPackageJson({ name: packageName, repository })

// Create new project directory
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
