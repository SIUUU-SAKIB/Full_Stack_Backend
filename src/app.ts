import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import httpStatus from 'http-status-codes';
import cookieParser from 'cookie-parser';
import serverless from 'serverless-http';
import { mainRouter } from './app/router/mainRouter';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFoundHandler } from './app/middlewares/notFound';
import { envVariable } from './app/config/env.config';

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());

// DEFAULT ROUTE
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(httpStatus.OK).json({
            success: true,
            message: 'ASSIGNMENT-6 SERVER WORKING',
        });
    } catch (error) {
        next(error);
    }
});

app.use('/api/v1/', mainRouter);
app.use(globalErrorHandler);
app.use(notFoundHandler);


export default app;  