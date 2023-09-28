import supertest from 'supertest';
import { UsuariosRepository } from '../../../../src/app/features/usuarios/repositories';
import { criaServidor } from '../../../../src/main/config/server.config';
import { DatabaseConnection, RedisConnection } from '../../../../src/main/database';
import { createUsers } from '../../../helpers';

describe('Testes de rotas de Usuarios', () => {
	let app: Express.Application;

	beforeAll(async () => {
		await DatabaseConnection.connect();
		await RedisConnection.connect();

		app = criaServidor();
	});

	afterAll(async () => {
		await DatabaseConnection.destroy();
		await RedisConnection.destroy();
	});

	afterEach(async () => {
		await new UsuariosRepository().clear();
	});

	test('Deve retornar status 400 se não for enviado o email', async () => {
		await supertest(app)
			.post('/usuarios/cadastro')
			.send({})
			.expect(400)
			.expect((res) => {
				expect(res.body).toEqual({
					sucesso: false,
					mensagem: 'É preciso informar o e-mail do tipo String.',
				});
			});
	});

	test('Deve retornar status 400 se for enviado o campo email diferente de string', async () => {
		await supertest(app)
			.post('/usuarios/cadastro')
			.send({
				email: 10,
			})
			.expect(400)
			.expect((res) => {
				expect(res.body).toEqual({
					sucesso: false,
					mensagem: 'É preciso informar o e-mail do tipo String.',
				});
			});
	});

	test('Deve retornar status 400 se não for enviado um email válido', async () => {
		await supertest(app)
			.post('/usuarios/cadastro')
			.send({
				email: 'testeteste.com',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body).toEqual({
					sucesso: false,
					mensagem: 'É preciso informar um e-mail válido.',
				});
			});
	});

	test('Deve retornar status 400 se não for enviado a senha', async () => {
		await supertest(app)
			.post('/usuarios/cadastro')
			.send({
				email: 'teste@teste.com',
				senha: 10,
			})
			.expect(400)
			.expect((res) => {
				expect(res.body).toEqual({
					sucesso: false,
					mensagem: 'É preciso informar a senha do tipo String.',
				});
			});
	});

	test('Deve retornar status 400 se a senha enviado for menor que 6 caracteres', async () => {
		await supertest(app)
			.post('/usuarios/cadastro')
			.send({
				email: 'teste@teste.com',
				senha: '12345',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body).toEqual({
					sucesso: false,
					mensagem: 'A senha deve conter ao menos 6 caracteres.',
				});
			});
	});

	test('Deve retornar status 400 se o email já existir na base de dados', async () => {
		await createUsers();

		await supertest(app)
			.post('/usuarios/cadastro')
			.send({
				email: 'any_email@teste.com',
				senha: '123456',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body).toEqual({
					sucesso: false,
					mensagem: 'Já existe um usuário cadastrado com esse e-mail.',
				});
			});
	});

	test('Deve retornar status 201 se o usuario for cadastrado com sucesso', async () => {
		await supertest(app)
			.post('/usuarios/cadastro')
			.send({
				email: 'any_email@teste.com',
				senha: '123456',
			})
			.expect(201)
			.expect((res) => {
				expect(res.body.sucesso).toBe(true);
				expect(res.body.mensagem).toBe('Usuário cadastrado com sucesso!');
				expect(res.body.dados).toBeTruthy();
			});
	});

	test('Deve retornar status 401 se o usuario não existir na base de dados', async () => {
		await supertest(app)
			.post('/usuarios/login')
			.send({
				email: 'any_email@teste.com',
				senha: '123456',
			})
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({
					sucesso: false,
					mensagem: 'Usuário não autorizado.',
				});
			});
	});

	test('Deve retornar status 200 se o usuario for logado com sucesso', async () => {
		await createUsers();

		await supertest(app)
			.post('/usuarios/login')
			.send({
				email: 'any_email@teste.com',
				senha: 'any_senha',
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.sucesso).toBe(true);
				expect(res.body.mensagem).toBe('Usuário autorizado.');
				expect(res.body.dados).toBeTruthy();
			});
	});
});
