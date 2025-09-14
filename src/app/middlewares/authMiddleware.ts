
import { NextFunction, Request, Response } from "express";
import { jwtTokens } from "../utils/jwtTokens";
import createAppError from "../Error/createAppError";
import httpStatus from 'http-status-codes'
export const authMiddleware = (...authRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) throw new createAppError(403, "No Token Received");

        const verifiedToken = jwtTokens.verifyToken(accessToken);
        if (authRoles.includes(verifiedToken.user)) {
            // throw new  createAppError(httpStatus.BAD_REQUEST, 'YOU ARE NOT PERMITTD TO VIEW THIS ROUTE 😔')
            console.log('YOU ARE NOT PERMITTD TO VIEW THIS ROUTE 😔')
        }

        req.user = verifiedToken;
        next();
    } catch (error: any) {
        console.log("jwt expired or invalid", error);
        next(error);
    }
};
