import { Router } from 'express';
import { auth, onlyAdmin, onlyCandidate } from '../../shared/middlewares';
import { UserController } from './controllers';
import {
  cleanInfo,
  createCandidateValidator,
  createUserValidator,
  fieldsValidator,
  filterUserValidator,
  loginValidator,
} from './middlewares';

export default () => {
  const router = Router();

  // Criação de usuários “admin” - Requisito 1
  router.post(
    '/users',
    [auth, onlyAdmin, fieldsValidator, cleanInfo, createUserValidator],
    UserController.createUser
  );

  // Cadastro de usuários “candidato” - Requisito 4
  router.post(
    '/candidates',
    [fieldsValidator, cleanInfo, createCandidateValidator],
    UserController.createCadidate
  );

  router.get('/candidates/applications', [auth, onlyCandidate]);

  // Login de usuários - Requisito 2
  router.post('/login', loginValidator, UserController.login);

  // Listagem de usuarios - Requisito 1, 3 e 4
  router.get(
    '/users',
    [auth, onlyAdmin, filterUserValidator],
    UserController.list
  );

  return router;
};
