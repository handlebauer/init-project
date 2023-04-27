import color from 'picocolors'
const { PORT } = process.env

/** @type {() => (req: ExpressRequest, _: ExpressResponse, done: ExpressNextFunction) => void} */
export const logIncomingRequest = () => (req, _, done) => {
  const method = color.bold(req.method)
  const url = `${req.protocol}://${req.hostname}:${PORT}${req.url}`
  console.log(`${method} ${url}`)
  if (Object.keys(req.body).length)
    console.log(color.dim(JSON.stringify(req.body, null, 3)))
  done()
}
