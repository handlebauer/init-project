import color from 'picocolors'
const { PORT } = process.env

const getDate = () => {
  const date = new Date()
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    dayPeriod: 'short',
    hour12: false,
    timeZone: 'America/Vancouver',
  })
    .format(date)
    .replace(/,/, '')
}

/** @type {() => (req: ExpressRequest, _: ExpressResponse, done: ExpressNextFunction) => void} */
export const logIncomingRequest = () => (req, _, done) => {
  const method = color.bold(req.method)
  const url = color.underline(
    `${req.protocol}://${req.hostname}:${PORT}${req.url}`
  )
  const dateTime = color.green(`[${getDate()}]`)
  const ip = color.dim(`(${req.ip})`)

  console.log(`${dateTime} ${method} ${url} ${ip}`)

  if (req.body && Object.keys(req.body).length)
    console.log(color.bold(JSON.stringify(req.body, null, 3)))

  done()
}
