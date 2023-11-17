import express from 'express'
import session from 'express-session'
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

configureAuthentication(app)

app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


