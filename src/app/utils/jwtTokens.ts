// utils/jwtTokens.ts
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { envVariable } from "../config/env.config"


const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, envVariable.JWT_SUPER_SECRET_TOKEN, {
    expiresIn: "1d",
  } as SignOptions);
};


const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, envVariable.JWT_SUPER_SECRET_TOKEN, {
    expiresIn: "7d",
  } as SignOptions);
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, envVariable.JWT_SUPER_SECRET_TOKEN) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const jwtTokens = {
  generateToken,
  generateRefreshToken,
  verifyToken,
};
