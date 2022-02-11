#!/usr/bin/env zx

import { $, fs, path, cd } from 'zx'

$.verbose = false

import Enquirer from 'enquirer'
import copy from 'clipboardy'

import '@hbauer/init-project/src/process-error.js'

import { defaultModules } from '@hbauer/init-project/src/default-modules.js'
import { defaultGitignore } from '@hbauer/init-project/src/default-gitignore.js'
import { defaultRollupConfig } from '@hbauer/init-project/src/default-rollup-config.js'
import { defaultJsConfig } from '@hbauer/init-project/src/default-js-config.js'
import { defaultTest } from '@hbauer/init-project/src/default-test.js'
import { defaultHuskyHook } from '@hbauer/init-project/src/default-husky-hook.js'

import { packageJsonSnippet } from '@hbauer/init-project/src/package-json-snippet.js'
import { lernaConfirm } from '@hbauer/init-project/src/lerna-confirm.js'

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

// Write default files
const pwd = await getPwd()
const pathTo = to => path.join(pwd, to)

fs.writeFileSync(pathTo('package.json'), JSON.stringify(packageJson, null, 2))
fs.writeFileSync(pathTo('.gitignore'), defaultGitignore)
fs.writeFileSync(pathTo('rollup.config.js'), defaultRollupConfig)
fs.writeFileSync(
  pathTo('jsconfig.json'),
  JSON.stringify(defaultJsConfig, null, 2)
)
fs.writeFileSync(pathTo('src/test.js'), defaultTest)

// Finish up
const lerna = await new Confirm(lernaConfirm).run()

if (lerna === false) {
  await $`git init`
  await $`yarn add -D ${defaultModules}`

  // Add husky
  await $`npx husky-init && yarn`
  await $`rm .husky/pre-commit`  
  fs.writeFileSync(pathTo('.husky/pre-commit'), defaultHuskyHook)
  await $`chmod +x .husky/pre-commit`
}

copy.writeSync(`cd ${repo}`)

await $`code .`
