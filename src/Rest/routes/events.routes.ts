import { Router } from 'express';
import EventController from '../Controllers/EventController';
import Authorization from '../Middlewares/Authorization';
import EventModelValidate from '../Middlewares/ValidModelState/EventModelValidate';

const eventRoutes = Router();
const eventModelValidate = new EventModelValidate();
const eventController = new EventController();

eventRoutes
  .route('/')
  .post(
    Authorization.isAuthenticated,
    Authorization.isAdmin,
    eventModelValidate.validateMiddleware,
    eventController.create,
  )
  .get(eventController.listEvents);

export default eventRoutes;
