import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserService from '../../Core/Services/UserService';
import CryptPassword from '../../Core/Tools/Encrypts/CryptPassword';
import JWTToken from '../../Core/Tools/Encrypts/JWTToken';
import HttpException from '../../Core/Tools/GlobalError/HttpException';

export default class LoginController {
  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const injectService = container.resolve(UserService);
      const user = await injectService.login(email);
      if (!user) {
        return response.status(401).json({ message: 'Invalid email or Password.' });
      }
      const compare = CryptPassword.compare(password, user.password);
      if (compare) {
        const generateToken = JWTToken.generateToken(user);
        return response.status(200).json({
          token: generateToken,
        });
      }
      return response.status(401).json({ message: 'Invalid email or Password.' });
    } catch (e) {
      throw new HttpException(401, e.message);
    }
  }
}
