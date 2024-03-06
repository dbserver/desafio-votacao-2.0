import { UserPermission } from "../../services/enum/user.enum"
import { UserSchema } from "../../services/schemas/users.schema"

const userSchemaMock: UserSchema = {
    document: '376.949.900-07',
    email: 'test' + Date.now() + '@gmail.com',
    password: '123456789',
    permission: UserPermission.DEFAULT,
    name: 'João da Silva'
}

const userIdMock = {
    id: 0
}

export {
    userIdMock, userSchemaMock
}
