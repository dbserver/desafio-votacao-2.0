import express from "express";
import { UserPermission } from "../services/enum/user.enum";

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
            permission: UserPermission
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
