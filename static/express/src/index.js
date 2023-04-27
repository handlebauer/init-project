import { server } from './server.js'
import { logIncomingRequest } from './middleware/log-incoming-request.js'

const { PORT } = process.env

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
