import express from 'express'
import { logIncomingRequest } from './middelware/log-incoming-request.js'

const server = express()

server.use(express.json())
server.use(logIncomingRequest())

server.get('/', (req, res) => res.json({ hello: 'world' }))

export { server }
