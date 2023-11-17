import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as _ from 'lodash'
import jwksClient from 'jwks-rsa'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) return res.status(401).json({ message: 'Unauthorized: Missing or Invalid Token' })
    const token = bearerToken.split(' ')[1]

    const jwksUri = "https://dev-yg.us.auth0.com/.well-known/jwks.json"
    const kid = "tOu0FHcN3C2etrel4Qhaz"

    const client = jwksClient({ jwksUri })

    client.getSigningKey(kid, (err, key: any) => {
        if (err || !key || !key?.publicKey) {
            res.status(500).json({ message: 'Error: Getting Signing Key Fail' })
        }

        jwt.verify(token, key.publicKey, (err: any, decoded: any) => {
            console.log(decoded)

            if (err) {
                console.log(err)
                return res.status(401).json({ message: 'Unauthorized: Missing or Invalid Token' })
            }

            const currentTime = Math.floor(Date.now() / 1000)

            if (decoded.exp && decoded.exp < currentTime) {
                return res.status(401).json({ message: 'Token has expired' })
            }
            next()
        })
    })
}
