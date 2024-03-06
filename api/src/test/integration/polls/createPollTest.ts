import moment from "moment"
import { createPoll } from "../../../controllers/polls/createPoll"
import { pollIdMock, pollOptionsMock, pollSchema } from "../../mock/poll.mock"
import { userIdMock } from "../../mock/user.mock"

export const createPollTest = () => describe("Create poll", () => {
    it('Sucess Save poll', async () => {
        const schema = { ...pollSchema }
        const poll = await createPoll(schema, userIdMock.id)
        pollIdMock.id = poll.id
        pollOptionsMock.push(...poll.pollsOptions ?? [])

        expect(poll).toHaveProperty('id')
        expect(poll).toHaveProperty('createdByUserId', userIdMock.id)
    })

    it('Error Save poll -Expiration date already expired', async () => {
        try {
            const schema = { ...pollSchema }
            schema.expiresAt = moment().utc(true).subtract(1, 'years').toDate()
            await createPoll(schema, userIdMock.id)
        } catch (error) {
            expect(error).toHaveProperty('code', 'POL60401')
        }
    })
})