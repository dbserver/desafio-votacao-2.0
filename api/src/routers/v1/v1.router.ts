import express from "express";
import usersRouter from './users.router';
import authRouter from "./auth.router";
import Authentication from "../../services/authentication/authentication";
import pollRouter from "./poll.router";

const v1 = express.Router({ mergeParams: true })

v1.use("/users", Authentication.handleAuthentication, usersRouter)
v1.use("/polls", Authentication.handleAuthentication, pollRouter)
v1.use("/auth", authRouter)

v1.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.statusCode || 500).send(err);
})

export default v1
