import { Request, Response } from 'express'
import * as _ from 'lodash'
import { Post } from '../services/post.service'
import { IPost } from '../domains/interface/post.interface'
import { sendResponseSuccess, sendResponseError } from '../utils/util'


const post = new Post()
export const getPost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const data = await post.getPost(id)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }
}

export const getPostList = async (req: Request, res: Response) => {
    try {
        const data = await post.getPostList()
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const dataCreate: IPost = req.body
        const data = await post.createPost(dataCreate)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }

}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const dataUpdate: IPost = req.body
        const data = await post.updatePost(id, dataUpdate)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }
}

export const updatePatchPost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const dataUpdate: Partial<IPost> = {}
        const title = req.body.title
        const body = req.body.body

        if(title) dataUpdate.title = title
        if(body) dataUpdate.body = body

        if (_.isEmpty(dataUpdate)) return sendResponseError(res, 'title or body is required!')

        const data = await post.updatePost(id, dataUpdate as IPost)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return sendResponseError(res, 'id is not a number!.')

        const data = await post.deletePost(id)
        return sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        return sendResponseError(res, error.message)
    }
}