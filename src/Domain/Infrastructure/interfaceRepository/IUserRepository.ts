import User from '../entities/User';

export default interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  list(): Promise<User[]>;
  login(email: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
