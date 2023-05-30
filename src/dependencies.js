const deps = {
  common: ['zod'],
  express: ['express', 'picocolors'],
}

export const dependencies = express =>
  express ? deps.common.concat(deps.express) : deps.common
