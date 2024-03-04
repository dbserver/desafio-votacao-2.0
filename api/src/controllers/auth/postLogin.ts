import crypto from "crypto";
import jwt from 'jsonwebtoken';
import { APIError } from "../../@types/types";
import Users from "../../entities/Users.entity";
import validator from "validator";

const errorPrefix = 'AUT537'

export async function postLogin(document: string, password: string) {
    const errors = [];
    if (validator.isEmpty(document)) errors.push('email')
    if (validator.isEmpty(password)) errors.push('password')
    if (errors.length > 0)
        throw new APIError(
            'Invalid document or password.',
            `${errorPrefix}01`,
            'Invalid document ' + document + ' or password.',
            422,
        )

    password = crypto.createHash('sha256').update(password).digest('hex')

    const user = await Users.findOne({
        where: {
            document,
            password
        }
    })

    if (!user) throw new APIError('User not found!', errorPrefix + '02', 'User not found!', 404, {
        document: document
    })

    const token = jwt.sign({
        id: user.id,
    },
        process.env.SECRETJWT!
        , {
            expiresIn: 30000
        }
    )

    return {
        auth: true,
        token: token
    }
}
