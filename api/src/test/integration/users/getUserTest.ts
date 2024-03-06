import { getUser } from "../../../controllers/users/getUser.controller"
import Database from "../../../services/dataBase/database"
import { userIdMock } from "../../mock/user.mock"

export const getUserTest = () => describe("Get User", () => {
    it('Find one user', async () => {
        const user = await getUser(userIdMock.id, Database.getManager())
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('uuid')
    })

    it('Error find one user - User not found!', async () => {
        try {
            await getUser(0)
        } catch (error) {
            expect(error).toHaveProperty('code', 'USR78101')
        }
    })
})