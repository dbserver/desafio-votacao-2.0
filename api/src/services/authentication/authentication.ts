import express from "express";
import { verify } from "jsonwebtoken";
import { APIError } from "../../@types/types";
import { UserPermission } from "../enum/user.enum";
import Users from "../../entities/Users.entity";

const errorPrefix = 'ATH787'

export default abstract class Authentication {
    /**
    Validates whether the request is authenticated with jwt
    @param {express.Request} req - Request.
    @param {express.Response} res - Response of request.
    @returns { Promise<void> }
   */
    static async verifyIsAuthenticated(req: express.Request, _res: express.Response) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1] || ''

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
            } else if (err?.message === 'jwt must be provided') {
                throw new APIError(
                    'jwt must be provided.',
                    `${errorPrefix}08`,
                    'jwt must be provided.',
                    401,
                )
            }
            else if (err) {
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

    /**
    handle authenticated 
    @param {express.Request} req - Request.
    @param {express.Response} res - Response of request.
    @param {express.NextFunction} next - Next of request.
    @returns { Promise<void> }
   */
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

    /**
    Validates whether the user has permission to access the route.
    @param {express.Request} req - Request.
    @param {express.Response} res - Response of request.
    @param {express.NextFunction} next - Next of request.
    @returns { Promise<void> }
   */
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

    /**
    handle permission validates whether the user has permission to access the route.
    @param {UserPermission} permission - Minimum type of permission user .
    @returns { Promise<void> }
   */
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