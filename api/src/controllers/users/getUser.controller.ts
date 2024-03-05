import { APIError } from "../../@types/types"
import Users from "../../entities/Users.entity"
import Database from "../../services/dataBase/database"

const errorPrefix = 'USR781'

/**
    Get user in database
    @param {number} id - id user.
    @param {EntityManager} manager - Entity manager working only with this query runner.
    @returns { Promise<Users> }
   */
export async function getUser(id: number, manager = Database.getManager()) {
    const user = await manager.findOne(Users,{
        where: {
            id
        }
    })

    if (!user) throw new APIError('User not found!', errorPrefix + '01', 'User not found!', 404, {
        userId: id
    })

    return user
}