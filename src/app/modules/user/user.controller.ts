import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookies } from "../../utils/storeCookie";
import { jwtTokens } from "../../utils/jwtTokens";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body)

        const accessToken = jwtTokens.generateToken(user)
        const refreshToken = jwtTokens.generateRefreshToken(user)
        setAuthCookies(res, accessToken, refreshToken)
        console.log(user)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User Created Successfully",
            data: user
        })

    } catch (error: any) {
        next(error)
    }
}

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createAdmin(req.body)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Admin created Successfully",
            data: user
        })
    } catch (error: any) {
        next(error)
    }
}

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        const user = await userService.getAllUser(page, limit)

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "All users retrieved successfully",
            total: user.totalUser,
            totalPages: user.totalPages,
            currentPage: user.currentPage,
            data: user.allUser,
        })
    } catch (error: any) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await userService.deleteUser(id, req.user)

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User deleted Successfully",
            data: null,
        })
    } catch (error: any) {
        next(error)
    }
}

const deleteByAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        await userService.deleteByAdmin(email)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User deleted Successfully",
            data: null,
        })
    } catch (error: any) {
        next(error)
    }
}
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const payload = req.body
        const user = await userService.updateUser(id, payload, req.user)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User updated Successfully",
            data: user,
        })
    } catch (error: any) {
        next(error)
    }
}
const updateUserbyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const payload = req.body
        const user = await userService.updateUserbyAdmin(id, payload)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User updated Successfully",
            data: user,
        })
    } catch (error: any) {
        next(error)
    }
}
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        await userService.verifyUser(email)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User verified successfully"
        })
    } catch (error) {
        next(error)
    }

}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body
    try {
        const user = await userService.getUserById(userId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User retrieved successfully 😍",
            data: user
        })
    } catch (error) {
        next(error)
    }
}
export const userController = {
    createUser, getAllUser, deleteUser, updateUser, createAdmin, verifyUser, getUserById, deleteByAdmin, updateUserbyAdmin
}