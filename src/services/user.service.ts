import { IUser, IUserService } from "../domains/interface/user.interface"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class User implements IUserService {
    public async getUser(id: number): Promise<IUser> {
        const data = await prisma.user.findUnique({
            where: { id },
            include: {
                address: {
                    include: {
                        geo: {
                            select: {
                                lat: true,
                                lng: true,
                            }
                        }
                    }
                },
                company: true,
            }
        })

        if (!data) throw new Error("Data Not Found")
        return data as IUser
    }

    public async getUserList(): Promise<IUser[]> {
        const data = await prisma.user.findMany({
            include: {
                address: {
                    include: {
                        geo: {
                            select: {
                                lat: true,
                                lng: true,
                            },
                        },
                    },
                },
                company: true,
            },
        })

        if (!data) throw new Error("Data Not Found")
        return data as IUser[]
    }

    public async createUser(user: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    public async updateUser(id: number, user: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    public async deleteUser(id: number): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
}

