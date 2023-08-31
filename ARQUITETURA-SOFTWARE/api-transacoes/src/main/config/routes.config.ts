import { Express, Request, Response } from 'express';
import rotasUsuario from '../../app/features/usuarios/usuarios.routes';

export function rotasApp(app: Express) {
	app.get('/', (req: Request, res: Response) => {
		res.status(200).json({ message: 'OK' });
	});

	app.use('/usuarios', rotasUsuario);
	// app.use('/transacoes');
}
