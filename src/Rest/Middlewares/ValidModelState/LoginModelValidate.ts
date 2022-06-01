import { NextFunction, Request, Response } from 'express';
import HttpException from '../../../Core/Tools/GlobalError/HttpException';
import User from '../../../Domain/Infrastructure/entities/User';

export default class LoginModelValidate {
  public async validateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;
      if (!body.email || !body.password) {
        throw new HttpException(400, 'email and password are required');
      }
      LoginModelValidate.validateModel(body);
      next();
    } catch (err) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
  private static validateModel(data: User): void {
    if (typeof data.password !== 'string') {
      throw new HttpException(400, 'Invalid Fields');
    }
    const requiredFields = ['email', 'password'];
    requiredFields.map((field) => {
      if (!data[field]) {
        throw new HttpException(400, `${field} is required`);
      }
    });
    return;
  }
}
