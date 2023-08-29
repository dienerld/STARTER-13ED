import { Express, Request, Response } from 'express';

export function rotasApp(app: Express) {
	app.get('/', (req: Request, res: Response) => {
		res.status(200).json({ message: 'OK' });
	});

	// app.use('/usuarios');
	// app.use('/transacoes');
}
