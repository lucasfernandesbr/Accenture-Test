import { Router } from 'express';

import authMiddleware from './app/middleware/auth';

import SignupController from './app/controllers/SignupController';
import SigninController from './app/controllers/SigninController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/signup', SignupController.store);

routes.post('/signin', SigninController.store);

routes.use(authMiddleware);

routes.get('/', UserController.index);

export default routes;
