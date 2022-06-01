import { Router } from 'express';
import PaymentController from '../Controllers/PaymentController';
import Authorization from '../Middlewares/Authorization';
import PaymentModelValidate from '../Middlewares/ValidModelState/PaymentModelValidate';

const paymentRoutes = Router();
const validateModel = new PaymentModelValidate();
const paymentController = new PaymentController();

paymentRoutes
  .route('/')
  .post(
    validateModel.validateMiddleware,
    Authorization.isSuperAdmin,
    paymentController.create,
  )
  .get(Authorization.isAuthenticated, paymentController.list);

export default paymentRoutes;
