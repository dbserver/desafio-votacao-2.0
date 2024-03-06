import { postLogin } from "../../../controllers/auth/postLogin"
import Users from "../../../entities/Users.entity"
import Database from "../../../services/dataBase/database"
import { userSchemaMock } from "../../mock/user.mock"

export const postAuthTest = () => describe("Post login", () => {
    it('Sucess post login', async () => {
        const auth = await postLogin(userSchemaMock.document, userSchemaMock.password, Database.getManager())

        expect(auth).toHaveProperty('auth', true)
        expect(auth).toHaveProperty('token')
    })

    it('Error post login  - Password is empty', async () => {
        try {
            await postLogin(userSchemaMock.document, '')
        } catch (error) {
            expect(error).toHaveProperty('code', 'AUT53701')
        }
    })

    it('Error post login  - Document is empty', async () => {
        try {
            await postLogin('', userSchemaMock.password)
        } catch (error) {
            expect(error).toHaveProperty('code', 'AUT53701')
        }
    })

    it('Error post login  - User not found', async () => {
        try {
            await postLogin(userSchemaMock.email, userSchemaMock.password + '40')
        } catch (error) {
            expect(error).toHaveProperty('code', 'AUT53702')
        }
    })
})