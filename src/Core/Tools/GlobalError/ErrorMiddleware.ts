import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import AppError from './HttpException';

function errorMiddleware(
  error: AppError,
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({
      message: 'Invalid token',
    });
  }
  if (error instanceof AppError) {
    return response.status(status).json({
      message,
    });
  }
  console.log(error);
  if (error) {
    return response.status(status).json({
      message,
    });
  }
  next();
}
export default errorMiddleware;
