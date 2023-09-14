import { Router } from 'express';
import { auth, onlyCandidate, onlyRecruiter } from '../../shared/middlewares';
import { JobsController } from './controllers/jobs.controller';
import { createJobValidator } from './middlewares';

export default () => {
	const router = Router();

	router.get('/vagas', (req, res) => {
		res.send('OK');
	});

	//Cadastro de vagas pelo recrutador - Requisito 5
	router.post('/jobs', [auth, onlyRecruiter, createJobValidator], JobsController.createJob);

	// Aplicação de uma vaga pelo candidato - Requisito 6
	router.post('/jobs/:idJob/apply', [auth, onlyCandidate]);

	return router;
};
