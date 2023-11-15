import { Response } from 'express'

export const sendResponseError = (res: Response, msg: string) => {
    return res.status(400).send({ message: msg })
}

export const sendResponseSuccess = (res: Response, msg: string, data?: any) => {
    return res.status(200).send({ message: msg, data })
}