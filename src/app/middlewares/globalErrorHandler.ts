import { Request, Response, NextFunction } from "express"
import { envVariable } from "../config/env.config";

interface CustomError extends Error {
    statusCode?: number
}

export const globalErrorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong'
    res.status(statusCode).json({
        success: false,
        message,
        error: {
            name: err.name,
            message: err.message,
            stack: envVariable.NODE_ENV !== "production" ? err.stack : undefined
        }
    })
}