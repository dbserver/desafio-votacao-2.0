import { plainToInstance } from "class-transformer"
import { UserAuthSchema, UserSchema } from "../../../services/schemas/users.schema"
import { userSchemaMock } from "../../mock/user.mock"
import { validate } from "class-validator"

export const userAuthSchemaTest = () => describe('Schema of userAuth', () => {
    it('Success validation userAuth schema', async () => {
        const schema = plainToInstance(UserAuthSchema, {
            document: userSchemaMock.document,
            password: userSchemaMock.password
        })
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(0)
    })

    it('Error validation userAuth schema - Document invalid ', async () => {
        const schema = plainToInstance(UserAuthSchema, {
            document: "44444444450",
            password: userSchemaMock.password
        })
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('document')
        expect(errors[0].constraints).toHaveProperty('CPF', 'Cpf!')
    })

    it('Error validation userAuth schema - Password with lenght > 24 ', async () => {
        const schema = plainToInstance(UserAuthSchema, {
            document: userSchemaMock.document,
            password: "Lorem Ipsum is simply dummy text of the pr"
        })

        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('password')
        expect(errors[0].constraints).toHaveProperty('isLength', 'password must be shorter than or equal to 24 characters')
    })

    it('Error validation user schema - Password with lenght < 8 ', async () => {
        const newUserSchemaMock = { ...userSchemaMock, password: '' }
        const schema = plainToInstance(UserSchema, newUserSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('password')
        expect(errors[0].constraints).toHaveProperty('isLength', 'password must be longer than or equal to 8 characters')
        expect(errors[0].constraints).toHaveProperty('isNotEmpty', 'password should not be empty')
    })
})