import { NextFunction, Request, Response } from "express"
import { jwtTokens } from "../utils/jwtTokens"
import createAppError from "../Error/createAppError"



export const authMiddleware= (...authRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization
        if (!accessToken) throw new createAppError(403, "No Token Received")

        const verifiedToken = jwtTokens.verifyToken(accessToken) 
        if (!verifiedToken) throw new createAppError(403, "Verification Failed")


        if (!authRoles.includes(verifiedToken.role)) {
            throw new createAppError(403, "You are not permitted to view on this route")
        }
        req.user = verifiedToken
        next()
    } catch (error: any) {
        console.log("jwt expired", error)
        next(error)
    }
}