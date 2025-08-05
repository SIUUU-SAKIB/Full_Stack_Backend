import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import httpStatus from "http-status-codes"
import cookieParser from "cookie-parser"
const app = express()

// ?MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(cookieParser())
// Default Route


app.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: "ASSIGNMENT-5 SERVER WORKING"
    })
})

export default app