import { Router } from 'express';
import OrderController from '../Controllers/OrderController';
import Authorization from '../Middlewares/Authorization';
import OrderModelValidate from '../Middlewares/ValidModelState/OrderModelValidate';

const orderRoutes = Router();
const oderModelValidate = new OrderModelValidate();
const orderController = new OrderController();

orderRoutes
  .route('/')
  .post(
    Authorization.isAuthenticated,
    oderModelValidate.validateMiddleware,
    orderController.create,
  )
  .get(Authorization.isAdmin, orderController.list);
orderRoutes.get('/tickets', orderController.getTickets);
export default orderRoutes;
