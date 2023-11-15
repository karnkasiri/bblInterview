import { IPost, IPostService } from "../domains/interface/post.interface"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class Post implements IPostService {
    public async getPost(id: number): Promise<IPost> {
        const data = await prisma.post.findUnique({
            where: { id }
        })

        if (!data) throw new Error("Data Not Found")
        return data as IPost
    }

    public async getPostList(): Promise<IPost[]> {
        const data = await prisma.post.findMany()

        if (!data) throw new Error("Data Not Found")
        return data as IPost[]
    }

    public async createPost(post: IPost): Promise<IPost> {
        throw new Error("Method not implemented.");
    }

    public async updatePost(id: number, post: IPost): Promise<IPost> {
        throw new Error("Method not implemented.");
    }
    
    public async deletePost(id: number): Promise<IPost> {
        throw new Error("Method not implemented.");
    }
}