import { Router } from 'express';
import Appointments from './appointments.routes';
import Users from './user.routes';
import Sessions from './sessions.routes';

const routes = Router();

routes.use('/appointments', Appointments);
routes.use('/users', Users);
routes.use('/sessions', Sessions);

export default routes;
