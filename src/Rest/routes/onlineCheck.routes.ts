import { Router } from 'express';

const onlineCheckRoutes = Router();

onlineCheckRoutes.route('/').get((_req, res) => res.send(`${Date.now()}: API Online.`));

export default onlineCheckRoutes;
