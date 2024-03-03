import { plainToInstance } from "class-transformer";
import express from "express";
import { createUser } from "../../controllers/users/postUser.controller";
import { UserSchema } from "../../services/schemas/users.schema";
import { validateAndThrow } from "../../services/schemas/validateAndThrow";
import Authentication from "../../services/authentication/authentication";

const userRouter = express.Router({ mergeParams: true })

userRouter.post('/',
    Authentication.handleAuthentication,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            console.log('aaaaaaaaaaaaaaaaaa')
            const schema = plainToInstance(UserSchema, req.body.user)
            await validateAndThrow(schema)
            next(schema)
        } catch (error) {
            res.status(422).json(error)
        }
    },
    async (schema: UserSchema, _req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = await createUser(schema)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)

export default userRouter
