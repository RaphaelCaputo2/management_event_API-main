import { Router } from 'express';
import errorMiddleware from '../../Core/Tools/GlobalError/ErrorMiddleware';
import Authorization from '../Middlewares/Authorization';
import eventRoutes from './events.routes';
import loginRoutes from './login.routes';
import onlineCheckRoutes from './onlineCheck.routes';
import orderRoutes from './order.router';
import paymentRoutes from './payment.routes';
import userRoutes from './user.routes';

const routes = Router();
routes.use('/online', onlineCheckRoutes);
routes.use('/event', eventRoutes);
routes.use('/user', userRoutes);
routes.use('/login', loginRoutes);
routes.use('/payment', paymentRoutes);
routes.use('/order', orderRoutes);

export default routes;
