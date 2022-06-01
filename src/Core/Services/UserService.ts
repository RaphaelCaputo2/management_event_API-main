import { inject, injectable } from 'tsyringe';
import User from '../../Domain/Infrastructure/entities/User';
import IUserRepository from '../../Domain/Infrastructure/interfaceRepository/IUserRepository';
import ValidateUser from '../Tools/validations/ValidateUser';

@injectable()
export default class UserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  public async validateUsers(email: string): Promise<User> {
    const validateUser = new ValidateUser(this.userRepository, email);
    await validateUser.execute(email);
    return;
  }
  public async create(data: Omit<User, 'id'>): Promise<User> {
    const user = await this.userRepository.create(data);
    return user;
  }
  public async list(): Promise<User[]> {
    const userList = await this.userRepository.list();
    return userList;
  }
  public async login(email: string): Promise<User> {
    const user = await this.userRepository.login(email);
    return user;
  }
  public async changeUserRole(email: string, role: string): Promise<User> {
    const user = await this.userRepository.changeUserRole(email, role);
    return user;
  }
}
