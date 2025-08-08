import { Response } from "express";
import { envVariable } from "../config/env.config";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
    // access token
    res.cookie(`accessToken`, accessToken, {
        httpOnly: true,
        secure: envVariable.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
    // refresh token
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
}