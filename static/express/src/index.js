import { server } from './server.js'

const { PORT } = process.env.port

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
