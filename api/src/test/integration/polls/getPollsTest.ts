import { getPolls } from "../../../controllers/polls/getPolls"
import { pollIdMock } from "../../mock/poll.mock"
import { userIdMock, userSchemaMock } from "../../mock/user.mock"

export const getPollsTest = () => describe("Create poll", () => {
    it('Sucess get polls', async () => {
        const poll = await getPolls(userIdMock.id, userSchemaMock.permission)
        expect(Array.isArray(poll)).toBe(true)
        expect((Array.isArray(poll) ? poll : []).length).toBeGreaterThanOrEqual(1)
    })

    it('Sucess get poll', async () => {
        const poll = await getPolls(userIdMock.id, userSchemaMock.permission, undefined, undefined, pollIdMock.id)
        expect(poll).toHaveProperty('id')
        expect(poll).toHaveProperty('createdByUserId', userIdMock.id)
    })
})