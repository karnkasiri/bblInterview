import { Request, Response } from 'express'
import { Post } from '../services/post.service'
import { IPost } from '../domains/interface/post.interface'
import { sendResponseSuccess, sendResponseError } from '../utils/util'

const post = new Post()
export const getPost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const data = await post.getPost(id)
        sendResponseSuccess(res, 'sucess', data)
        
    } catch (error: any) {
        sendResponseError(res, error.message)
    }
}

export const getPostList = async (req: Request, res: Response) => {
    try {
        const data = await post.getPostList()
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const dataCreate: IPost = req.body
        const data = await post.createPost(dataCreate)
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }

}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const dataUpdate: IPost = req.body
        const data = await post.updatePost(id, dataUpdate)
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const data = await post.deletePost(id)
        sendResponseSuccess(res, 'sucess', data)

    } catch (error: any) {
        sendResponseError(res, error.message)
    }
}