import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";

export const authRoutes = Router()

// *LOG-IN USER
authRoutes.post('/login', AuthController.credentialsLogin)

// *RESET PASSWORD
authRoutes.patch('/reset-password',authMiddleware(...Object.values(Role)), AuthController.resetPassword)

// *LOGOUT
authRoutes.post('/logout', authMiddleware(...Object.values(Role)), AuthController.logout)
authRoutes.post('/refreshToken', AuthController.refreshToken)
authRoutes.get('/me',authMiddleware(...Object.values(Role)), AuthController.getMe)