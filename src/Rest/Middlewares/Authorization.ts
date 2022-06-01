import { Request, NextFunction, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import HttpException from '../../Core/Tools/GlobalError/HttpException';
import AppError from '../../Core/Tools/GlobalError/HttpException';
import JWTToken from '../../Core/Tools/Encrypts/JWTToken';

export default class Authorization {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new HttpException(401, 'Unauthorized');
      }
      const verify = await JWTToken.verifyToken(req.headers.authorization);
      if (!verify) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      next();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      } else {
        throw new AppError(500, 'Erro interno do servidor');
      }
    }
  }

  public static async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const verify = await JWTToken.verifyToken(req.headers.authorization);
      if (!verify) {
        throw new HttpException(401, 'Unauthorizede');
      }
      if (verify.role !== 'admin') {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      next();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      } else {
        throw new AppError(500, 'Erro interno do servidor');
      }
    }
  }
  public static async isSuperAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const verify = await JWTToken.verifyToken(req.headers.authorization);
      if (!verify) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      if (verify.role !== 'super_admin') {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      next();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      } else {
        throw new AppError(500, 'Erro interno do servidor');
      }
    }
  }
}
