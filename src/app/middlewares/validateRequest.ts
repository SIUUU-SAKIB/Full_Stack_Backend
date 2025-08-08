import { Request, Response, NextFunction } from 'express';


export const vaildateZodSchema = (zodSchema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await zodSchema.parseAsync(req.body)
          next()
    } catch (error: any) {
        next(error)
    }

}