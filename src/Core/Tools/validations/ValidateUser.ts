import IUserRepository from '../../../Domain/Infrastructure/interfaceRepository/IUserRepository';
import HttpException from '../GlobalError/HttpException';

export default class ValidateUser {
  private _email: string;
  constructor(private userRepository: IUserRepository, private email: string) {
    this._email = email;
  }
  public async execute(_email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(this._email);
    if (user) {
      throw new HttpException(400, 'User already exists');
    }
    return;
  }
}
