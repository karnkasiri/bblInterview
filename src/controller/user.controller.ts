import { Request, Response } from 'express'
import { User } from '../services/user.service'
import { IUser } from '../domains/interface/user.interface'
import { sendResponseSuccess, sendResponseError } from '../utils/util'
import * as _ from 'lodash'
const user = new User()
export const getUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const data = await user.getUser(id)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }
}

export const getUserList = async (req: Request, res: Response) => {
    try {
        const data = await user.getUserList()
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const dataCreate: IUser = req.body
        const data = await user.createUser(dataCreate)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }

}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const dataUpdate: IUser = req.body
        const data = await user.updateUser(id, dataUpdate)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }

}

export const updatePatchUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const dataUpdate: Partial<IUser> = {}

        const name = req.body.name

        if (name) dataUpdate.name = name

        if (_.isEmpty(dataUpdate)) return sendResponseError(res, 'name is required!')

        const data = await user.updateUser(id, dataUpdate as IUser)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const data = await user.deleteUser(id)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }

}