import { UserPermission } from "../enum/user.enum"

export interface Auth {
    token: string
    auth: boolean
}

export interface UserAuth {
    id: number
    uuid: string
    name: string
    email: string
    permission: UserPermission
    readonly createdAt?: Date
    readonly updatedAt?: Date
}