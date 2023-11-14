import { Express } from 'express'
import session from 'express-session'
import { PassportStatic } from 'passport'
import { Strategy as OpenIDConnectStrategy } from 'passport-openidconnect'

export default async function configureAuthentication(app: Express, passport: PassportStatic) {
    app.use(
        session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: true,
        })
    )
    passport.use(
        'openidconnect',
        new OpenIDConnectStrategy(
            {
                issuer: 'https://dev-yg.us.auth0.com/',
                authorizationURL: 'https://dev-yg.us.auth0.com/authorize',
                tokenURL: 'https://dev-yg.us.auth0.com/oauth/token',
                userInfoURL: 'https://dev-yg.us.auth0.com/userinfo',
                clientID: 'H9F6QG5SzTKMv0tbmgxLj9LjG1EKVllA',
                clientSecret: '',
                callbackURL: 'http://localhost:3000/callback',
                scope: ['openid', 'profile', 'email'],
                responseMode: 'form_post'
            },
            (issuer: string, profile: any, context: object, idToken: string | object, accessToken: string | object, refreshToken: string, done: any) => {
                const userWithIdToken = {
                    ...profile,
                    idToken
                }
                return done(null, userWithIdToken)
            }
        )
    )

    passport.serializeUser((user: any, done) => {
        done(null, user)
    })

    passport.deserializeUser((obj: any, done) => {
        done(null, obj)
    })

    app.use(passport.initialize())
    app.use(passport.session())

    app.get('/login', passport.authenticate('openidconnect'))

    app.post(
        '/callback',
        passport.authenticate('openidconnect', {
            successRedirect: '/',
            failureRedirect: '/login',
        })
    )

    app.get('/logout', (req, res) => {
        req.logout(() => { })
        res.redirect('/')
    })

    app.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            console.log(req)
            console.log('Hello, ka!')
        } else {
            console.log('Error, ka!')
        }
    })
}


