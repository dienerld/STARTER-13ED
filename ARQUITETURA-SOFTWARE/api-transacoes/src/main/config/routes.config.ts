import { Express, Request, Response } from 'express';

export function makeRoutes(app: Express) {
	app.use('/', (req: Request, res: Response) => {
		res.status(200).json({ message: 'OK' });
	});

	// app.use('/usuarios');
	// app.use('/transacoes');
}
