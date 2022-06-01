import { Router } from 'express';
import UserController from '../Controllers/UserController';
import Authorization from '../Middlewares/Authorization';
import UserModelValidate from '../Middlewares/ValidModelState/UserModelValidate';

const userRoutes = Router();
const userModelValidate = new UserModelValidate();
const userController = new UserController();

userRoutes
  .route('/')
  .post(userModelValidate.validateMiddleware, userController.create)
  .get(Authorization.isSuperAdmin, userController.list);

export default userRoutes;
