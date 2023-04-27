import express from 'express'

const server = express()

server.use(express.json())

server.get('/', (req, res) => res.json({ hello: 'world' }))

export { server }
