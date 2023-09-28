import cors from 'cors';
import express from 'express';
import { rotasApp } from '.';
import { appEnvs } from '../../app/envs';

// config de middlewares
export function criaServidor() {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());

	rotasApp(app);

	// START DO SERVER
	app.listen(appEnvs.porta, () => console.log(`Servidor rodando na porta ${appEnvs.porta} 🚀`));

	return app;
}
