import { NextFunction, Request, Response } from 'express';
import IUserDTO from '../../../Core/DTOs/Interfaces/IUserDTO.interface';
import HttpException from '../../../Core/Tools/GlobalError/HttpException';
import User from '../../../Domain/Infrastructure/entities/User';

export default class UserModelValidate {
  public async validateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;

      await UserModelValidate.validateEmailWithRegex(body.email);
      UserModelValidate.validateModel(body);
      next();
    } catch (err) {
      return res
        .status(err.statusCode || 400)
        .json({ message: err.message } || 'Something went wrong');
    }
  }
  private static validateModel(user: User): void {
    const requiredFields = ['name', 'email', 'password', 'phone'];
    requiredFields.map((field) => {
      if (!user[field]) {
        throw new HttpException(400, `${field} is required`);
      }
    });
    return;
  }
  private static validateEmailWithRegex(email: string): Promise<boolean> {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test(String(email).toLowerCase());
    if (!isValid) {
      throw new HttpException(400, 'Invalid email');
    }
    return Promise.resolve(true);
  }
}
