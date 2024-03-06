import { createPollOptionUser } from "../../../controllers/polls/createPollOptionUser"
import { pollIdMock, pollOptionsMock } from "../../mock/poll.mock"
import { userIdMock } from "../../mock/user.mock"


export const createPollOptionUserTest = () => describe("Create poll option user", () => {
    
    it('Sucess save poll option user', async () => {
        const pollOptionUser = await createPollOptionUser(
            userIdMock.id,
            pollIdMock.id,
            pollOptionsMock[0].id
        )
        expect(pollOptionUser).toHaveProperty('userId',   userIdMock.id)
        expect(pollOptionUser).toHaveProperty('pollOptionId', pollOptionsMock[0].id)
        expect(pollOptionUser).toHaveProperty('pollId', pollIdMock.id)
    })

    it('Error save poll option user - Poll option not found', async () => {
        try {
            await createPollOptionUser(
                userIdMock.id,
                pollIdMock.id,
                0
            )
        } catch (error) {
            expect(error).toHaveProperty('code', 'POL68701')
        }
    })

    it('Error save poll option user - User already answered this question', async () => {
        try {
            await createPollOptionUser(
                userIdMock.id,
                pollIdMock.id,
                pollOptionsMock[0].id
            )
        } catch (error) {
            expect(error).toHaveProperty('code', 'POL68703')
        }
    })    
})