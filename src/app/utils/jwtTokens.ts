import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { envVariable } from "../config/env.config"



const generateToken = (payload: JwtPayload, expiresIn: string = '1d'): string => {
    const token = jwt.sign(payload, envVariable.JWT_SUPER_SECRET_TOKEN, {
        expiresIn
    } as SignOptions)
    return token
}
const generateRefreshToken = (payload: JwtPayload, expiresIn: string = '30d'): string => {
    const token = jwt.sign(payload, envVariable.JWT_SUPER_SECRET_TOKEN, {
        expiresIn
    } as SignOptions)
    return token
}
const verifyToken = (payload: string) => {
    try {
        const decodedToken = jwt.verify(payload, envVariable.JWT_SUPER_SECRET_TOKEN) as JwtPayload
        return decodedToken
    } catch (error: any) {
        throw new Error('Invalid or expired token')
    }
}
export const jwtTokens = {
    generateToken, verifyToken, generateRefreshToken
}