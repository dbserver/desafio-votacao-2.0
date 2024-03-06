import express from "express";
import Authentication from "../../services/authentication/authentication";
import authRouter from "./auth.router";
import pollRouter from "./poll.router";
import usersRouter from './users.router';

const v1 = express.Router({ mergeParams: true })



v1.use("/users", Authentication.handleAuthentication, usersRouter)
v1.use("/polls", Authentication.handleAuthentication, pollRouter)
v1.use("/auth", authRouter)

v1.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.statusCode || 500).send(err);
  })

export default v1
