import { createUser } from "../../../controllers/users/postUser.controller"
import Database from "../../../services/dataBase/database"
import { userSchemaMock, userIdMock } from "../../mock/user.mock"

export const createUserTest = () => describe("Create User", () => {

    it('Sucess Save user', async () => {
        const newUserSchemaMock = { ...userSchemaMock }
        const user = await createUser(newUserSchemaMock, Database.getManager())
        userIdMock.id = user.id
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('uuid')
    })

    it('Error Save user - Email already in use', async () => {
        try {
            const newUserMock = {
                ...userSchemaMock,
                document: "654.137.450-36"
            }
            await createUser(newUserMock, Database.getManager())
        } catch (error) {
            expect(error).toHaveProperty('code', 'USR84701')
        }
    })

    it('Error Save user - Document already in use', async () => {
        try {
            const newUserMock = {
                ...userSchemaMock,
                email: 'test' + Date.now() + '@gmail.com'
            }
            await createUser(newUserMock, Database.getManager())
        } catch (error) {
            expect(error).toHaveProperty('code', 'USR84702')
        }
    })
})