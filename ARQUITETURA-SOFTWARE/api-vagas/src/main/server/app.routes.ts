import { Express } from 'express';
import usersRoutes from '../../app/features/users/users.routes';

export const makeRoutes = (app: Express) => {
	app.use(usersRoutes());
};
