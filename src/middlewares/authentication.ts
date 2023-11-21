import { Express, Request, Response } from 'express'
import passport from 'passport'
import { Strategy as OpenIDConnectStrategy } from 'passport-openidconnect'
import { IUserProfile } from '../domains/interface/userProfile.interface'

export const configureAuthentication = async (app: Express) => {

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
            },
            (issuer: string, profile: any, context: object, idToken: string | object, accessToken: string | object, refreshToken: string, done: any) => {
                const user = {
                    profile,
                    idToken
                }
                return done(null, user)
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

    app.get(
        '/callback',
        passport.authenticate('openidconnect', {
            successRedirect: '/',
            failureRedirect: '/login',
        })
    )

    app.get('/logout', (req, res) => {
        req.logout((err) => console.log(err))
        res.redirect('/')
    })

    app.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            const user = req.user as IUserProfile
            res.status(200).send({ token: user.idToken })
        } else {
            res.status(401).send('login fail')
        }
    })

}

