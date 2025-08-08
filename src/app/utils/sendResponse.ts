import { Response } from "express";
interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  total?:number,
  data?: T;
}

export const sendResponse = <T>(res: Response, {
  success,
  statusCode,
  message,
  total,
  data,
}: IApiResponse<T>): void => {
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    total,
    data,

  });
};
