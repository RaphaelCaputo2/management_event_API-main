import { NextFunction, Request, Response } from 'express';
import HttpException from '../../../Core/Tools/GlobalError/HttpException';
import Order from '../../../Domain/Infrastructure/entities/Order';

export default class OrderModelValidate {
  public async validateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;
      OrderModelValidate.validateModel(body);
      next();
    } catch (err) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
  private static validateModel(data: Order): void {
    const requiredFields = ['quantity', 'ticket', 'user', 'payment_method'];
    requiredFields.map((field) => {
      if (!data[field]) {
        throw new HttpException(400, `${field} is required`);
      }
    });
    return;
  }
}
