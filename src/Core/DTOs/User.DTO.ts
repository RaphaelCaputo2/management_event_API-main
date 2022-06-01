import User from '../../Domain/Infrastructure/entities/User';
import IUserDTO from './Interfaces/IUserDTO.interface';

export class UserDTO implements IUserDTO {
  id?: string;
  name: string;
  email: string;
  role: string;

  constructor(name: string, email: string, role: string, id?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public getUserDTO(user: User): UserDTO {
    return new UserDTO(user.name, user.email, user.role);
  }
}
