import { Router } from 'express';
import { auth, onlyAdmin } from '../../shared/middlewares';
import { UserController } from './controllers';
import {
	cleanInfo,
	createCandidateValidator,
	createUserValidator,
	fieldsValidator,
	loginValidator,
} from './middlewares';

export default () => {
	const router = Router();

	router.post(
		'/users',
		[auth, onlyAdmin, fieldsValidator, cleanInfo, createUserValidator],
		UserController.createUser
	);

	router.post('/candidates', [fieldsValidator, cleanInfo, createCandidateValidator], UserController.createCadidate);

	router.post('/login', loginValidator, UserController.login);
	router.get('/users', [auth, onlyAdmin], UserController.list);

	return router;
};
