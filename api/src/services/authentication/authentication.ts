import express from "express";
import { verify } from "jsonwebtoken";
import { APIError } from "../../@types/types";
import { UserPermission } from "../enum/user.enum";
import Users from "../../entities/Users.entity";

const errorPrefix = 'ATH787'

export default abstract class Authentication {
    static async verifyIsAuthenticated(req: express.Request, res: express.Response) {
        const token = req.headers['x-access-token'] as string

        verify(token, process.env.SECRETJWT!, (err, decoded) => {
            if (err?.message === 'jwt expired') {
                throw new APIError(
                    'jwt expired.',
                    `${errorPrefix}01`,
                    'jwt expired.',
                    401,
                )
            }

            else if (err?.message === 'invalid token') {
                throw new APIError(
                    'invalid token.',
                    `${errorPrefix}02`,
                    'invalid token.',
                    401,
                )
            } else if (err) {
                throw new APIError(
                    `unexpected error.`,
                    `${errorPrefix}03`,
                    "unexpected error.",
                    401
                )
            }

            if (typeof decoded === 'object') {
                req.userId = decoded.id
            }
        })
    }

    static async handleAuthentication(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            await Authentication.verifyIsAuthenticated(req, res)
            next();
        }
        catch (ex) {
            if (ex instanceof APIError) {
                res.status(ex.statusCode || 500).json({
                    ...ex,
                    message: ex.message
                }).end()
                return
            }
            throw new APIError(
                `unexpected error.`,
                `${errorPrefix}04`,
                "unexpected error.",
                401,
                ex
            )
        }
    }

    static async verifyPermission(req: express.Request, _res: express.Response, permission: UserPermission) {
        const user = await Users.findOne({
            where: {
                id: req.userId!
            }
        })
        if (!user) throw new APIError('User not found!', errorPrefix + '05', 'User not found!', 404)
        if (permission === UserPermission.ADMIN && user?.permission === UserPermission.DEFAULT) {
            throw new APIError(
                'No required permission.',
                `${errorPrefix}06`,
                'The current user does not have sufficient permissions.',
                401
            )
        }
        req.permission = user.permission
    }

    static handlePermission(permission: UserPermission) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                await Authentication.verifyPermission(req, res, permission)
                next()
            }
            catch (ex) {
                if (ex instanceof APIError) {
                    res.status(ex.statusCode || 500).json({
                        ...ex,
                        message: ex.message
                    }).end()
                    return
                }
                throw new APIError(
                    `unexpected error.`,
                    `${errorPrefix}07`,
                    "unexpected error.",
                    401,
                    ex
                )
            }
        }
    }
}