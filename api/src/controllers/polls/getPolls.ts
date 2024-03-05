import Polls from "../../entities/Polls.entity";
import Database from "../../services/dataBase/database";
import { UserPermission } from "../../services/enum/user.enum";

/**
    Get polls in database
    @param {UserPermission} permission - Type of permission user.
    @param {number} page - Pagination.
    @param {number} id - Poll id.
    @param {EntityManager} manager - Entity manager working only with this query runner.
    @returns { Promise<Polls | Polls[] | null> }
   */
export async function getPolls(permission: UserPermission, page = 0, id?: number, manager = Database.getManager()) {
    const conditions = manager.createQueryBuilder(Polls, "poll")
    .leftJoinAndSelect('poll.pollsOptions', 'pollsOptions')

    if(permission === UserPermission.DEFAULT) conditions.andWhere(`poll.expiresAt <= '${new Date().toISOString()}'`)
    if(id) conditions.andWhere(`poll.id = ${id}`)

    conditions.orderBy('poll.createdAt', 'DESC')
    conditions.take(10)
    conditions.skip(page * 10)

    return  !id ? await conditions.getMany() : await conditions.getOne()
}