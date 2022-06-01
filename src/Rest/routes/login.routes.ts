import { Router } from 'express';
import LoginController from '../Controllers/LoginController';
import LoginModelValidate from '../Middlewares/ValidModelState/LoginModelValidate';

const loginRoutes = Router();
const loginModelValidate = new LoginModelValidate();
const loginController = new LoginController();

loginRoutes.route('/').post(loginModelValidate.validateMiddleware, loginController.login);

export default loginRoutes;
