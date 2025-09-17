import { Response } from "express";
import { envVariable } from "../config/env.config";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  // Check if the environment is production
  const isProduction = process.env.NODE_ENV === "production";

  // Set accessToken cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,  // Prevents access to cookie via JavaScript
    secure: isProduction,  // Set to true in production (HTTPS)
    sameSite: "none",  // Required for cross-origin requests
    domain: ".onrender.com",  // Set domain to .onrender.com for subdomain sharing
    maxAge: 24 * 60 * 60 * 1000,  // Access token expires in 1 day
  });

  // Set refreshToken cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,  // Prevents access to cookie via JavaScript
    secure: isProduction,  // Set to true in production (HTTPS)
    sameSite: "none",  // Required for cross-origin requests
    domain: ".onrender.com",  // Set domain to .onrender.com for subdomain sharing
    maxAge: 7 * 24 * 60 * 60 * 1000,  // Refresh token expires in 7 days
  });
};
