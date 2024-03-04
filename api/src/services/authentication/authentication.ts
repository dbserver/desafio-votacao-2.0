import express from "express"
import { APIError } from "../../@types/types";
import { verify } from "jsonwebtoken";

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
            if(ex instanceof APIError) {
                res.status(ex.statusCode || 500).json({
                    ...ex,
                    message: ex.message
                }).end()
                return
            }
            throw new APIError(
                `unexpected error.`,
                `${errorPrefix}03`,
                "unexpected error.",
                401,
                ex
            )
        }
    }
}