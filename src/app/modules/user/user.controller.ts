import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body)
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
const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getAllUser()

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "All user retreived Successfully",
            total: user.totalUser,
            data: user.allUser,
        })
    } catch (error: any) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await userService.deleteUser(id)

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
        const user = await userService.updateUser(id, payload)
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
export const userController = {
    createUser, getAllUser, deleteUser, updateUser
}