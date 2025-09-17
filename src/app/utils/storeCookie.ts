import { Response } from "express";
import { envVariable } from "../config/env.config";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {



  res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: envVariable.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,  
});

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: envVariable.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,  
});

};
