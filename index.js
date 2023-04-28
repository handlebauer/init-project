#!/usr/bin/env zx

import { $, fs, path, cd } from 'zx'
import { createRequire } from 'module'
import Enquirer from 'enquirer'
import copy from 'clipboardy'

import {
  buildPackageJson,
  buildGitignore,
  packageJsonSnippet,
  lernaToggle,
  expressToggle,
  devDependencies,
  dependencies,
  preCommitHook,
  getPwd,
  getLernaJson,
} from '@hbauer/init-project/src/index.js'

// Show zx output?
$.verbose = false

process.once('uncaughtException', err => {
  console.log(err)
  console.log(`
      Aborting..
  `)
})

const { Toggle, Input, Snippet } = Enquirer

let pwd = await getPwd()

// Monorepo?
const lerna = await new Toggle(lernaToggle).run()
const express = await new Toggle(expressToggle).run()

const { version } = lerna ? await getLernaJson(pwd) : { version: '0.0.0' }

// package.json?
const { values: fields } = await new Snippet(
  packageJsonSnippet(lerna, version)
).run()

// Directory name?
const dirname =
  lerna === false
    ? fields.name
    : await new Input({
        message: 'What is the directory name?',
        initial: fields.name,
      }).run()

// Parse repo
const parts = fields.name.split('/')
const repo = parts.length === 2 ? parts[1] : parts[0]

// Add properties before building
fields.repo = repo
fields.version = version
fields.express = express

// Build package.json
const packageJson = buildPackageJson(fields)

// Lerna doesn't need the repository field
if (lerna) delete packageJson.repository

// Build .gitignore
const gitignore = buildGitignore(lerna, express)

// Turn this back on to indicate progress
$.verbose = true

// Create new project directory
await $`mkdir ${lerna ? dirname : repo}`
await cd(lerna ? dirname : repo)

// Copy over static files
const packageRoot = createRequire(import.meta.url)
  .resolve('@hbauer/init-project')
  .split('/')
  .slice(0, -1)
  .join('/')

express
  ? await $`cp -r ${packageRoot}/static/express/. .`
  : await $`cp -r ${packageRoot}/static/package/. .`

// Write package.json files
pwd = await getPwd()
const pathTo = to => path.join(pwd, to)
fs.writeFileSync(pathTo('package.json'), JSON.stringify(packageJson, null, 2))
fs.writeFileSync(pathTo('.gitignore'), gitignore)

if (lerna === false) {
  await $`git init`
  await $`yarn add -D ${devDependencies(express)}`
  await $`yarn add ${dependencies(express)}`

  // First commit
  await $`git add . && git commit -m "Init"`

  // Set up husky
  await $`mkdir .husky`
  fs.writeFileSync(pathTo('.husky/pre-commit'), preCommitHook)
  await $`npx husky install`
  await $`npm pkg set scripts.prepare="husky install"`
  await $`chmod +x .husky/pre-commit`
  await $`git add . && git commit -m "Configure husky"`
}

copy.writeSync(`cd ${lerna ? dirname : repo}`)

await $`code .`
