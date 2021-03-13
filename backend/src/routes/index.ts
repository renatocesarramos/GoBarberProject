import { Router } from 'express';
import Appointments from './appointments.routes';
import Users from './user.routes';

const routes = Router();

routes.use('/appointments', Appointments);
routes.use('/users', Users);

export default routes;
