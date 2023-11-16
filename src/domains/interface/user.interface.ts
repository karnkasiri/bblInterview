import { Status } from '../enum'
import { IPost } from './post.interface'

export interface IUser {
    id: number
    name: string
    username: string
    email: string
    phone: string
    website: string
    address?: IAddress
    company?: ICompany
    post?: IPost[]
    status: Status
    createdAt: Date
    updatedAt: Date
}

export interface IAddress {
    id: string
    street: string
    suite: string
    city: string
    zipcode: string
    geo: IGeo
    userId: number
    createdAt: Date
    updatedAt: Date
}

export interface IGeo {
    id: string
    lat: string
    lng: string
    addressId: string
}

export interface ICompany {
    id: string
    name: string
    catchPhrase: string
    bs: string
    userId: number
    createdAt: Date
    updatedAt: Date
}

export interface IUserService {
    getUser(id: number): Promise<IUser>
    getUserList(): Promise<IUser[]>
    createUser(user: IUser): Promise<IUser>
    updateUser(id: number, user: IUser): Promise<IUser>
    deleteUser(id: number): Promise<IUser>
}