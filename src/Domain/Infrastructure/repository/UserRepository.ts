import { Repository } from 'typeorm/repository/Repository';
import HttpException from '../../../Core/Tools/GlobalError/HttpException';
import { AppDataSource } from '../../../data-source';
import User from '../entities/User';
import IUserRepository from '../interfaceRepository/IUserRepository';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }
  async create(data: Omit<User, 'id'>): Promise<User> {
    try {
      const user = await this.ormRepository.save(data);
      return user;
    } catch (_e) {
      throw new HttpException(500, 'Internal Error');
    }
  }
  async list(): Promise<User[]> {
    const userList = await this.ormRepository.find();
    return userList;
  }
  async login(email: string): Promise<User> {
    try {
      const user = await this.ormRepository.findOne({
        where: {
          email,
        },
      });
      return user;
    } catch (e) {
      throw new HttpException(500, 'Internal Error');
    }
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
