import { $ } from 'zx'
import { pathToFileURL } from 'url'

export const getLernaJson = async pwd => {
  const path = new URL('lerna.json', pathToFileURL(pwd)).pathname
  return JSON.parse((await $`cat ${path}`).stdout)
}
