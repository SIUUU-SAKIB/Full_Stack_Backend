import { NextFunction, Request, Response } from "express"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'
import { setAuthCookies } from "../../utils/storeCookie";
import { jwtTokens } from "../../utils/jwtTokens";
import { UserModel } from "../user/userModel";
import { AdminModel } from "../user/admin_model";



const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const user = await authService.credentialsLogin(payload, res)
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

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "No refresh token provided" });
        }
        const decoded = jwtTokens.verifyToken(token) as any;
        const newAccess = jwtTokens.generateToken({ id: decoded.id, role: decoded.role });
        const newRefresh = jwtTokens.generateRefreshToken({ id: decoded.id });

        setAuthCookies(res, newAccess, newRefresh);

        res.json({
            success: true,
            accessToken: newAccess,
            refreshToken: newRefresh,
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};


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
// controllers/auth.controller.ts
const getMe = async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id) || await AdminModel.findById(req.user._id)

    const currentUser = user === null ? req.user : user;

    res.json({
        success: true,
        currentUser:currentUser, 
    });
};

export const AuthController = {
    credentialsLogin, resetPassword, logout, refreshToken, getMe
}