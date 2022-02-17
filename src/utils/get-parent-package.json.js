import { $ } from 'zx'
import { pathToFileURL } from 'url'

export const getParentPackageJson = async pwd => {
  const path = new URL('package.json', pathToFileURL(pwd)).pathname
  return JSON.parse((await $`cat ${path}`).stdout)
}
