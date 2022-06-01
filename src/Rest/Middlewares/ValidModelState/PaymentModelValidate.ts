import { NextFunction, Request, Response } from 'express';
import HttpException from '../../../Core/Tools/GlobalError/HttpException';
import Payment from '../../../Domain/Infrastructure/entities/Payment';

export default class PaymentModelValidate {
  public async validateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;
      PaymentModelValidate.validateModel(body);
      next();
    } catch (err) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
  private static validateModel(data: Payment): void {
    const requiredFields = ['quantity', 'ticket', 'user', 'payment_method'];
    requiredFields.map((field) => {
      if (!data[field]) {
        throw new HttpException(400, `${field} is required`);
      }
    });
    return;
  }
}
