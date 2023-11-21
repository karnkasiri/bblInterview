import { IUser, IUserService } from "../domains/interface/user.interface"
import { Status } from '../domains/enum'
import * as _ from 'lodash'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class User implements IUserService {
    public async getUser(id: number): Promise<IUser> {
        try {
            const data = await prisma.user.findUnique({
                where: { id, status: Status.ACTIVE },
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
        } catch (err) {
            throw new Error(`Get Data Fail : ${err}`)
        }
    }

    public async getUserList(): Promise<IUser[]> {
        try {
            const data = await prisma.user.findMany({
                where: { status: Status.ACTIVE },
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

            if (_.isEmpty(data)) throw new Error("Data Not Found")
            return data as IUser[]
        } catch (err) {
            throw new Error(`Get Data Fail : ${err}`)
        }
    }

    public async createUser(user: IUser): Promise<IUser> {
        try {
            const { address, company, post, ...userData } = user
            const geo = address?.geo

            const dataCreate: any = {
                ...userData,
                status: Status.ACTIVE,
                address: {
                    create: {
                        ...address,
                        geo: { create: geo, },
                    }
                },
                company: { create: company, },
            }

            const data = await prisma.user.create({
                data: dataCreate,
                include: {
                    address: {
                        include: {
                            geo: true,
                        },
                    },
                    company: true,
                },
            })

            return data as IUser
        } catch (err) {
            throw new Error(`Create Data Fail : ${err}`)
        }
    }

    public async updateUser(id: number, user: IUser): Promise<IUser> {
        try {
            const { address, company, post, ...userData } = user
            const geo = address?.geo

            const dataUpdate: any = {
                ...userData
            }

            if (address) {
                dataUpdate.address = {
                    update: address
                }
                if (geo) {
                    dataUpdate.address.update.geo = {
                        update: geo
                    }
                }
            }

            if (company) {
                dataUpdate.company = {
                    update: company
                }
            }

            const data = await prisma.user.update({
                where: { id },
                data: {
                    ...dataUpdate,
                    updatedAt: new Date()
                },
                include: {
                    address: {
                        include: {
                            geo: true,
                        },
                    },
                    company: true,
                },
            })

            return data as IUser
        } catch (err) {
            throw new Error(`Update Data Fail : ${err}`)
        }
    }

    public async deleteUser(id: number): Promise<IUser> {
        try {
            const data = await prisma.user.update({ where: { id }, data: { status: Status.INACTIVE, updatedAt: new Date() } })

            if (!data) throw new Error("Update Data Fail")
            return data as IUser
        } catch (err) {
            throw new Error(`Delete Data Fail : ${err}`)
        }
    }
}