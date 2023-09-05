import { Express } from 'express';
import usuariosRoutes from '../../app/feature/usuarios/usuarios.routes';

export const makeRoutes = (app: Express) => {
	app.use('/usuarios', usuariosRoutes());
};
