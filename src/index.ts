import express from 'express'
import { createServer } from 'http'
import passport from 'passport'
import bodyParser from 'body-parser'
import setupAuthentication from '../src/middlewares/authentication'
import router from '../src/routes'

const app = express()

const server = createServer(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
// setupAuthentication(app, passport)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})