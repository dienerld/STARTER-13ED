import { Router } from 'express';
import { controller } from './controllers';

export default () => {
	const router = Router();

	router.post('/cadastro', controller.cadastrar);
	router.post('/login', controller.login);
	router.get('/exemplo', controller.exemploRotaPrivada);

	return router;
};
