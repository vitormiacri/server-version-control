import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ServerController from './app/controllers/ServerController';
import VersionsController from './app/controllers/VersionsController';

import authMiddlare from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlare);

routes.delete('/users/:id', UserController.delete);
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

routes.delete('/servers/:id', ServerController.delete);
routes.post('/servers', ServerController.store);
routes.get('/servers', ServerController.index);
routes.put('/servers/:id', ServerController.update);

routes.delete('/versions/:id', VersionsController.delete);
routes.post('/versions', VersionsController.store);
routes.get('/versions', VersionsController.index);
routes.put('/versions/:id', VersionsController.update);

export default routes;
