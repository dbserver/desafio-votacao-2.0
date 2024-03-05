import moment from "moment";
import { APIError } from "../../@types/types";
import PollsOptions from "../../entities/PollsOptions.entity";
import PollsOptionsUsers from "../../entities/PollsOptionsUsers.entity";
import Database from "../../services/dataBase/database";

const errorPrefix = 'POL687'

/**
    Save answer user of poll in database
    @param {number} userId - Id user.
    @param {number} pollId - Id poll.
    @param {number} pollOptionId - Id poll option.
    @param {EntityManager} manager - Entity manager working only with this query runner.
    @returns { Promise<PollsOptionsUsers> }
   */
export async function createPollOptionUser(
    userId: number,
    pollId: number,
    pollOptionId: number,
    manager = Database.getManager()
) {
    const pollOption = await manager.findOne(PollsOptions, {
        where: {
            id: pollOptionId,
            pollId
        },
        relations: {
            poll: true
        }
    })

    if (!pollOption) throw new APIError('Poll option not found!', errorPrefix + '01', 'Poll option not found!', 404, {
        id: pollOptionId,
        pollId
    })

    if (moment(pollOption.poll.expiresAt).isBefore(moment().utc(true))) throw new APIError('Poll expired!', errorPrefix + '02', 'Poll expired!', 404, {
        id: pollOptionId,
        pollId
    })

    const create = PollsOptionsUsers.create({
        pollOptionId,
        pollId: pollOption.pollId,
        userId
    })

    return await manager.save(PollsOptionsUsers, create)
        .catch(e => {
            if (e && e.code === 'ER_DUP_ENTRY')
                throw new APIError(
                    `User already answered this question`,
                    `${errorPrefix}03`,
                    "User already answered this question",
                    422
                )
            throw new APIError(
                `unexpected error.`,
                `${errorPrefix}04`,
                "unexpected error.",
                401
            )
        }).then(async v => {
            await manager.update(PollsOptions, {
                id: pollOption.id
            }, {
                selectCount: pollOption.selectCount + 1
            })
            return v
        })

} 