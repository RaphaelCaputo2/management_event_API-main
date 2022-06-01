import { Request, response, Response } from 'express';
import { container } from 'tsyringe';
import IUserDTO from '../../Core/DTOs/Interfaces/IUserDTO.interface';
import { UserDTO } from '../../Core/DTOs/User.DTO';
import UserService from '../../Core/Services/UserService';
import CryptPassword from '../../Core/Tools/Encrypts/CryptPassword';
import UserModelValidate from '../Middlewares/ValidModelState/UserModelValidate';

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const injectService = container.resolve(UserService);
      await injectService.validateUsers(body.email);
      const encryptPass = CryptPassword.encrypt(body.password);
      body.password = encryptPass;
      body.role = 'user';
      await injectService.create(body);
      return response.status(201).json();
    } catch (err) {
      return response.status(err.statusCode).json({ message: err.message });
    }
  }

  async list(_request: Request, response: Response): Promise<Response<IUserDTO>> {
    const injectService = container.resolve(UserService);
    const listedUsers = await injectService.list();
    const mapper = listedUsers.map((user) => {
      const userDto = new UserDTO(user.name, user.email, user.role);
      return userDto.getUserDTO(user);
    });
    return response.status(200).json(mapper);
  }
}
