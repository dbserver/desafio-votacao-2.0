import express from "express";

declare global {
    interface Error {
        status?: string
        statusDetail?: string
        statusCode?: number
    }

    namespace Express {
        interface Request {
            response?: express.Response
            userId: number
        }
    }

    interface JWTPayload {
        iss: string;
        iat: number;
        sid?: string;
        userId?: number
        exp?: number;
        jti?: string;
    }

    interface Error {
        status?: string;
        statusDetail?: string;
        statusCode?: number;
    }
}
