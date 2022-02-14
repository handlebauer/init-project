#!/usr/bin/env zx

import { $, fs, path, cd } from 'zx'
import { createRequire } from 'module'
import Enquirer from 'enquirer'
import copy from 'clipboardy'

import {
  buildPackageJson,
  buildGitignore,
  packageJsonSnippet,
  lernaConfirm,
  devDependencies,
  getPwd,
} from '@hbauer/init-project/src/index.js'

// Show zx output?
$.verbose = true

process.once('uncaughtException', () => {
  console.log(`
      Aborting..
  `)
})

const { Snippet, Confirm } = Enquirer

// Monorepo?
const lerna = await new Confirm(lernaConfirm).run()
// package.json?
const { values: fields } = await new Snippet(packageJsonSnippet(lerna)).run()

// Build package.json
const parts = fields.name.split('/')
const repo = parts.length === 2 ? parts[1] : parts[0]
const packageJson = buildPackageJson({ ...fields, repo })
if (lerna) delete packageJson.repository

// Build .gitignore
const gitignore = buildGitignore(lerna)

// Create new project directory
await $`mkdir ${repo}`
await cd(repo)

// Copy over static files
const packageRoot = createRequire(import.meta.url)
  .resolve('@hbauer/init-project')
  .split('/')
  .slice(0, -1)
  .join('/')
await $`cp -r ${packageRoot}/static/. .`

// Write package.json files
const pwd = await getPwd()
const pathTo = to => path.join(pwd, to)
fs.writeFileSync(pathTo('package.json'), JSON.stringify(packageJson, null, 2))
fs.writeFileSync(pathTo('.gitignore'), gitignore)

if (lerna === false) {
  await $`git init`
  await $`yarn add -D ${devDependencies}`

  // First commit
  await $`git add . && git commit -m "Init"`

  // Set up husky
  await $`npx husky install`
  await $`npm set-script prepare "husky install"`
  await $`chmod +x .husky/pre-commit`
  await $`git add . && git commit -m "Configure husky"`
}

copy.writeSync(`cd ${repo}`)

await $`code .`
