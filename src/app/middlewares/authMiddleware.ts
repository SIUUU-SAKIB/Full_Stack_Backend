
import { NextFunction, Request, Response } from "express";
import { jwtTokens } from "../utils/jwtTokens";
import createAppError from "../Error/createAppError";
export const authMiddleware =
  (...authRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new createAppError(401, "Unauthorized: No token provided");
      }

      const verifiedToken = jwtTokens.verifyToken(accessToken);
      if (
        authRoles.length &&
        !authRoles.includes(verifiedToken.role)
      ) {
        throw new createAppError(
          403,
          "YOU ARE NOT PERMITTED TO VIEW THIS ROUTE 😔"
        );
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("JWT error:", error);
      next(error);
    }
  };
