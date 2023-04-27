import { server } from './server.js'

const { PORT } = process.env

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
