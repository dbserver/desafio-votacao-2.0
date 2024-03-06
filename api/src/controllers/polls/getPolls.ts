import { FindOptionsWhere, In, LessThan, MoreThan, MoreThanOrEqual } from "typeorm";
import Polls from "../../entities/Polls.entity";
import PollsOptionsUsers from "../../entities/PollsOptionsUsers.entity";
import Database from "../../services/dataBase/database";
import { UserPermission } from "../../services/enum/user.enum";
import moment from "moment";

/**
    Get polls in database
    @param {UserPermission} permission - Type of permission user.
    @param {number} page - Pagination.
    @param {number} id - Poll id.
    @param {number} category - Category poll.
    @param {EntityManager} manager - Entity manager working only with this query runner.
    @returns { Promise<Polls | Polls[] | null> }
   */
export async function getPolls(userId: number, permission: UserPermission, page = 0, category?: string, id?: number, manager = Database.getManager()) {
    const where: FindOptionsWhere<Polls> = {
        expiresAt: permission === UserPermission.DEFAULT ? MoreThanOrEqual(moment().utc(true).toDate()) : undefined,
        id: id || id === 0 ? id : undefined,
        category: category ? category : undefined
    }

    const polls = await manager.find(Polls, {
        where,
        order: {
            createdAt: 'DESC'
        },
        take: 10,
        skip: page * 10,
        relations: {
            pollsOptions: true
        }
    })

    const pollsOptionsUsers = await manager.find(PollsOptionsUsers, {
        where: {
            pollId: In(polls.map(v => v.id)),
            userId
        },
        relations: {
            pollOption: true
        }
    })

    const result = polls.map(poll => {
        const pollOptionUser = pollsOptionsUsers.find(pou => pou.pollId === poll.id)
        poll.pollsOptionsUsers = pollOptionUser ? [pollOptionUser] : []
        return poll
    })

    return !id ? result : result[0]
}
