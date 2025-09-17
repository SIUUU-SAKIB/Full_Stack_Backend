import { Response } from "express";
import { envVariable } from "../config/env.config";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {



  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: envVariable.NODE_ENV === "production",
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    secure: envVariable.NODE_ENV === "production",
    sameSite: "none",
  });
};
