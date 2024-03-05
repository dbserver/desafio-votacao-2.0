import crypto from "crypto";
import { UserSchema } from "../../services/schemas/users.schema";
import Database from "../../services/dataBase/database";
import Users from "../../entities/Users.entity";
import { plainToInstance } from "class-transformer";
import { APIError } from "../../@types/types";

const errorPrefix = 'USR847'

/**
    Save user in database
    @param {UserSchema} schema - Schema user.
    @param {EntityManager} manager - Entity manager working only with this query runner.
    @returns { Promise<Users> }
   */

export async function createUser(schema: UserSchema, manager = Database.getManager()) {
    schema.password = crypto.createHash('sha256').update(schema.password).digest('hex')
    schema.document = schema.document.replace(/[^0-9]/g, '')

    const plain = plainToInstance(Users, schema)
    const create = Users.create(plain)
    const user = await manager.save(Users, create)
        .catch(e => {
            if (e && e.code === 'ER_DUP_ENTRY' && /IDX_U_EMAIL/.test(e.sqlMessage))
                throw new APIError(
                    `The email ${schema.email} is already in use by another user.`,
                    `${errorPrefix}01`,
                    "Provide a different email.",
                    422,
                    schema
                )
            else if (e && e.code === 'ER_DUP_ENTRY' && /IDX_U_DOCUMENT/.test(e.sqlMessage))
                throw new APIError(
                    `The document ${schema.document} is already in use by another document.`,
                    `${errorPrefix}02`,
                    "Provide a different document.",
                    422,
                    schema
                )
            throw new APIError(
                `unexpected error.`,
                `${errorPrefix}03`,
                "unexpected error.",
                401
            )
        }).then(v => v)

    return user
}