import { Status } from "../enum"

export interface IPost {
    id: number
    title: string
    body: string
    userId: number
    status: Status
    createdAt: Date
    updatedAt: Date
}

export interface IPostService {
    getPost(id: number): Promise<IPost>
    getPostList(): Promise<IPost[]>
    createPost(post: IPost): Promise<IPost>
    updatePost(id: number, post: IPost): Promise<IPost>
    deletePost(id: number): Promise<IPost>
}