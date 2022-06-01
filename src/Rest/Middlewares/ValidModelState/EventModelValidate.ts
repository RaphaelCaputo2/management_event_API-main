import { NextFunction, Request, Response } from 'express';
import HttpException from '../../../Core/Tools/GlobalError/HttpException';
import Event from '../../../Domain/Infrastructure/entities/Event';

export default class EventModelValidate {
  public async validateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;
      EventModelValidate.validateModel(body);
      next();
    } catch (err) {
      return res
        .status(err.statusCode || 400)
        .json({ message: err.message } || 'Something went wrong');
    }
  }
  private static validateModel(data: Event): void {
    const requiredFields = ['name', 'locale', 'stock', 'price'];
    requiredFields.map((field) => {
      if (!data[field]) {
        throw new HttpException(400, `${field} is required`);
      }
    });
    return;
  }
}
