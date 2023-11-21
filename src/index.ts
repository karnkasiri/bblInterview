import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import { configureAuthentication } from '../src/middlewares/authentication'
import router from '../src/routes'

const app = express()

app.use(
    session({
        secret: 'uwqXMX6mdG',
        resave: false,
        saveUninitialized: true,
    })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


configureAuthentication(app)

app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


