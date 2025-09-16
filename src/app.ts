import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import httpStatus from "http-status-codes"
import cookieParser from "cookie-parser"
import { mainRouter } from "./app/router/mainRouter"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler"
import { notFoundHandler } from "./app/middlewares/notFound"
const app = express()

// ?MIDDLEWARES
const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true,  
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())



// *DEFAULT ROUTE
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {

        res.status(httpStatus.OK).json({
            success: true,
            message: "ASSIGNMENT-5 SERVER WORKING"
        })

    } catch (error) {
        next(error)
    }

})
app.use('/api/v1/', mainRouter)
app.use(globalErrorHandler)
app.use(notFoundHandler)
export default app