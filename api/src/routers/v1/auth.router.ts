import { plainToInstance } from "class-transformer";
import express from "express";
import { postLogin } from "../../controllers/auth/postLogin";
import { UserAuthSchema } from "../../services/schemas/users.schema";
import { validateAndThrow } from "../../services/schemas/validateAndThrow";

const authRouter = express.Router({ mergeParams: true });

authRouter.post('/',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const schema = plainToInstance(UserAuthSchema, req.body.user)
            await validateAndThrow(schema)
            next(schema)
        } catch (error) {
            res.status(422).json(error)
        }
    },
    async (schema: UserAuthSchema, _req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = await postLogin(schema.document, schema.password)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)

export default authRouter
