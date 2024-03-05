import moment from "moment";
import Polls from "../../entities/Polls.entity";
import PollsOptions from "../../entities/PollsOptions.entity";
import Database from "../../services/dataBase/database";
import { PollSchema } from "../../services/schemas/poll.schema";

/**
    Save poll in database
    @param {UserSchema} schema - Schema user.
    @param {number} userId - id user.
    @param {EntityManager} manager - Entity manager working only with this query runner.
    @returns { Promise<Polls> }
   */
export async function createPoll(
    schema: PollSchema,
    userId: number,
    manager = Database.getManager()
) {
    schema.expiresAt = schema.expiresAt ? schema.expiresAt : moment().utc(true).add(1, 'minutes').toDate()

    const create = Polls.create({
        ...schema,
        createdByUserId: userId
    })

    const poll = await manager.save(Polls, create)

    const createPollsOptions = PollsOptions.create([
        {
            option: '1',
            selectCount: 0,
            pollId: poll.id
        },
        {
            option: '0',
            selectCount: 0,
            pollId: poll.id
        }
    ])

    const pollsOptions = await manager.save(PollsOptions, createPollsOptions)

    poll.pollsOptions = pollsOptions
    return poll
}