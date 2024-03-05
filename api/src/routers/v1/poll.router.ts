import { plainToInstance } from "class-transformer";
import express from "express";
import { createPoll } from "../../controllers/polls/createPoll";
import { getPolls } from "../../controllers/polls/getPolls";
import Authentication from "../../services/authentication/authentication";
import { UserPermission } from "../../services/enum/user.enum";
import { PollSchema } from "../../services/schemas/poll.schema";
import { validateAndThrow } from "../../services/schemas/validateAndThrow";
import { createPollOptionUser } from "../../controllers/polls/createPollOptionUser";

const pollRouter = express.Router({ mergeParams: true })

pollRouter.post('/',
    Authentication.handlePermission(UserPermission.ADMIN),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const schema = plainToInstance(PollSchema, req.body.poll)
            await validateAndThrow(schema)
            next(schema)
        } catch (error) {
            res.status(422).json(error)
        }
    },
    async (schema: PollSchema, req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = await createPoll(schema, req.userId!)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)

pollRouter.get('/',
    Authentication.handlePermission(UserPermission.DEFAULT),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const page = req.query.page ? parseInt(req.query.page.toString()) : 0
            const result = await getPolls(req.userId, req.permission, page)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)


pollRouter.get('/:id',
    Authentication.handlePermission(UserPermission.DEFAULT),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = await getPolls(req.userId, req.permission, 0, +req.params.id!)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)

pollRouter.post('/:id/options/:optionsId',
    Authentication.handlePermission(UserPermission.DEFAULT),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = await createPollOptionUser(req.userId!, +req.params.id!, +req.params.optionsId!)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)

export default pollRouter
