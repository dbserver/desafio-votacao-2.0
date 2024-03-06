import { UserPermission } from "../enum/user.enum"

export interface UserDto {
    name: string
    email: string
    document: string
    permission: UserPermission,
    password: string
}