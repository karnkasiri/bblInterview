import { IPost, IPostService } from "../domains/interface/post.interface"
import { Status } from "../domains/enum"
import * as _ from 'lodash'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class Post implements IPostService {
    public async getPost(id: number): Promise<IPost> {
        try {
            const data = await prisma.post.findUnique({
                where: { id, status: Status.ACTIVE }
            })

            if (!data) throw new Error("Data Not Found")

            return data as IPost

        } catch (err) {
            throw new Error(`Get Data Fail : ${err}`)
        }
    }

    public async getPostList(): Promise<IPost[]> {
        try {
            const data = await prisma.post.findMany({ where: { status: Status.ACTIVE } })

            if (_.isEmpty(data)) throw new Error("Data Not Found")

            return data as IPost[]

        } catch (err) {
            throw new Error(`Get Data Fail : ${err}`)
        }
    }

    public async createPost(post: IPost): Promise<IPost> {
        try {
            const data = await prisma.post.create({ data: post })
            return data as IPost

        } catch (err) {
            throw new Error(`Create Data Fail : ${err}`)
        }
    }

    public async updatePost(id: number, post: IPost): Promise<IPost> {
        try {
            const data = await prisma.post.update({ where: { id }, data: post })
            return data as IPost

        } catch (err) {
            throw new Error(`Update Data Fail : ${err}`)
        }
    }

    public async deletePost(id: number): Promise<IPost> {
        try {
            const data = await prisma.post.update({ where: { id }, data: { status: Status.INACTIVE } })
            return data as IPost

        } catch (err) {
            throw new Error(`Delete Data Fail : ${err}`)
        }
    }
}