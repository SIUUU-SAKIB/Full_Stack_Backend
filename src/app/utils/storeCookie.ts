import { Response } from "express";
import { envVariable } from "../config/env.config";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === "production";
  const secureFlag = isProduction; // Only use secure cookies in production (when HTTPS is enabled)

  // Set accessToken cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: secureFlag,  // Ensures cookie is sent only over HTTPS in production
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  // Set refreshToken cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: secureFlag,  // Same as accessToken
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

