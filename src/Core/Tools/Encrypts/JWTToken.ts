import User from '../../../Domain/Infrastructure/entities/User';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

export default class JWTToken {
  public static generateToken(user: User): string {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
    return token;
  }
  public static verifyToken(token: string): any {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }
}
