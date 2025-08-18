import { NextFunction, Request, Response } from "express"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'
import { setAuthCookies } from "../../utils/storeCookie";


const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const user = await authService.credentialsLogin(payload, res)

        setAuthCookies(res, user.accessToken, user.refreshToken)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: "Logged in successfully 😍",
            data: user
        })
    } catch (error: any) {
        next(error)
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword } = req.body;
        const { newPassword } = req.body;
        const { email } = req.body

        const user = await authService.resetPassword(oldPassword, newPassword, email)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: "Password reset successfully 😍",
            data: user
        })
    } catch (error: any) {
        next(error)
    }
}


const logout = (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "Logout successful"
    })
};

export const AuthController = {
    credentialsLogin, resetPassword, logout
}