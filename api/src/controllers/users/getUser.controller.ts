import { APIError } from "../../@types/types"
import Users from "../../entities/Users.entity"

const errorPrefix = 'USR781'

export async function getUser(id: number) {
    const user = await Users.findOne({
        where: {
            id
        }
    })

    if (!user) throw new APIError('User not found!', errorPrefix + '01', 'User not found!', 404, {
        userId: id
    })

    return user
}