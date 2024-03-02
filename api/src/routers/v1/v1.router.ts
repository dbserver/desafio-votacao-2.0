import express from "express";
import usersRouter from './users.router';

const v1 = express.Router({ mergeParams: true })

v1.use("/users", usersRouter)

v1.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.statusCode || 500).send(err);
})

export default v1
