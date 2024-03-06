import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { UserSchema } from "../../../services/schemas/users.schema"
import { userSchemaMock } from "../../mock/user.mock"

export const userSchemaTest = () => describe('Schema of user', () => {
    it('Success validation user schema', async () => {
        const schema = plainToInstance(UserSchema, userSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(0)
    })

    it('Error validation user schema - name with lenght < 2 ', async () => {
        const newUserSchemaMock = { ...userSchemaMock, name: '' }
        const schema = plainToInstance(UserSchema, newUserSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('name')
        expect(errors[0].constraints).toHaveProperty('isLength', 'name must be longer than or equal to 2 characters')
        expect(errors[0].constraints).toHaveProperty('isNotEmpty', 'name should not be empty')
    })

    it('Error validation user schema - Name with lenght > 255 ', async () => {
        const newUserSchemaMock = {
            ...userSchemaMock, name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        const schema = plainToInstance(UserSchema, newUserSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('name')
        expect(errors[0].constraints).toHaveProperty('isLength', 'name must be shorter than or equal to 255 characters')
    })

    it('Error validation user schema - Email invalid', async () => {
        const newUserSchemaMock = {
            ...userSchemaMock, email: 'teste'
        }
        const schema = plainToInstance(UserSchema, newUserSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('email')
        expect(errors[0].constraints).toHaveProperty('isEmail', 'email must be an email')
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

    it('Error validation user schema - Password with lenght > 24 ', async () => {
        const newUserSchemaMock = {
            ...userSchemaMock, password: "Lorem Ipsum is simply dummy text of the pr"
        }
        const schema = plainToInstance(UserSchema, newUserSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('password')
        expect(errors[0].constraints).toHaveProperty('isLength', 'password must be shorter than or equal to 24 characters')
    })

    it('Error validation user schema - Document invalid ', async () => {
        const newUserSchemaMock = {
            ...userSchemaMock, document: '44444444450'
        }
        const schema = plainToInstance(UserSchema, newUserSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('document')
        expect(errors[0].constraints).toHaveProperty('CPF', 'Cpf!')
    })

    it('Error validation user schema - Permission invalid ', async () => {
        const newUserSchemaMock = {
            ...userSchemaMock, permission: Date.now().toString()
        }
        const schema = plainToInstance(UserSchema, newUserSchemaMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('permission')
        expect(errors[0].constraints).toHaveProperty('isEnum', 'permission must be one of the following values: ADMIN, DEFAULT')
    })
})