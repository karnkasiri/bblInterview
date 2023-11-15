import { Request, Response } from 'express'
import { User } from '../services/user.service'
import { IUser } from '../domains/interface/user.interface'
import { sendResponseSuccess, sendResponseError } from '../utils/util'

const user = new User()
export const getUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const data = await user.getUser(id)
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }
}

export const getUserList = async (req: Request, res: Response) => {
    try {
        const data = await user.getUserList()
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const dataCreate: IUser = req.body
        const data = await user.createUser(dataCreate)
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }

}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const dataUpdate: IUser = req.body
        const data = await user.updateUser(id, dataUpdate)
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const data = await user.deleteUser(id)
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }

}