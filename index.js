#!/usr/bin/env zx

import { $, fs, path, cd } from 'zx'

$.verbose = false

import Enquirer from 'enquirer'

import '@hbauer/init-project/src/process-error.js'

import { defaultModules } from '@hbauer/init-project/src/default-modules.js'
import { defaultGitignore } from '@hbauer/init-project/src/default-gitignore.js'
import { defaultRollupConfig } from '@hbauer/init-project/src/default-rollup-config.js'
import { defaultTest } from '@hbauer/init-project/src/default-test.js'

import { packageJsonSnippet } from '@hbauer/init-project/src/package-json-snippet.js'
import { lernaConfirm } from './src/lerna-confirm.js'

import { buildPackageJson } from '@hbauer/init-project/src/build-package-json.js'
import { getPwd } from '@hbauer/init-project/src/utils/get-pwd.js'

const { Snippet, Confirm } = Enquirer

// Prompt

const { values: fields } = await new Snippet(packageJsonSnippet).run()
const parts = fields.name.split('/')
const repo = parts.length === 2 ? parts[1] : parts[0]

const packageJson = buildPackageJson({ ...fields, repo })

// Create new project directory
await $`mkdir ${repo}`
await cd(repo)

// Create empty index.js
await $`mkdir src`
await $`touch src/index.js`

// Initialize git
await $`git init`

// Write default files
const pwd = await getPwd()
const pathTo = to => path.join(pwd, to)

fs.writeFileSync(pathTo('package.json'), JSON.stringify(packageJson, null, 2))
fs.writeFileSync(pathTo('.gitignore'), defaultGitignore)
fs.writeFileSync(pathTo('rollup.config.js'), defaultRollupConfig)
fs.writeFileSync(pathTo('src/test.js'), defaultTest)

// Finish up
const lerna = await new Confirm(lernaConfirm).run()

if (lerna === false) {
  $`yarn add -D ${defaultModules}`
}
