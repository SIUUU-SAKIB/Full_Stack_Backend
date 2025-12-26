import { NextFunction, Request, Response } from "express"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus, { StatusCodes } from 'http-status-codes'
import { setAuthCookies } from "../../utils/storeCookie";
import { jwtTokens } from "../../utils/jwtTokens";
import { UserModel } from "../user/userModel";
import { AdminModel } from "../user/admin_model";
import createAppError from "../../Error/createAppError";
import { envVariable } from "../../config/env.config";



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

const getNewAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new createAppError(
        StatusCodes.UNAUTHORIZED,
        "No refresh token received"
      );
    }

    const tokenInfo = await authService.getNewAccessToken(refreshToken);

    // 🔑 SET COOKIES FIRST
    setAuthCookies(res, tokenInfo.accessToken, tokenInfo.refreshToken);

    // 🔑 THEN send response
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Access token refreshed successfully",
      data: null, // no need to expose tokens
    });

  } catch (error) {
    next(error);
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


const logout = (req: Request, res: Response) => {
  const isProduction = envVariable.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" as const : "lax" as const,
    path: "/", 
  };

  res.clearCookie("refreshToken", cookieOptions);
  res.clearCookie("accessToken", cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logout successful",
  });
};



// controllers/auth.controller.ts
const getMe = async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id) || await AdminModel.findById(req.user._id)

    const currentUser = user === null ? req.user : user;

    res.json({
        success: true,
        currentUser: currentUser,
    });
};

export const AuthController = {
    credentialsLogin, resetPassword, logout, getNewAccessToken, getMe
}