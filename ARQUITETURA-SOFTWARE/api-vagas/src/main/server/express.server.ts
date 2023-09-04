import { Request, Response } from 'express';
import { appEnvs } from '../../app/envs';
import { createServer } from '../config/express.config';

export function runServer() {
	const app = createServer();

	app.get('/', (req: Request, res: Response) => {
		res.status(200).json({
			ok: true,
			message: 'API Bombando',
		});
	});

	// CHAMADA PARA AS RODAS DE FUNCIONALIDADES
	// ROTAS USUARIOS
	// ROTAS VAGAS

	app.listen(appEnvs.porta, () => console.log('API esta rodando na porta ' + appEnvs.porta));
}
