import { randomUUID } from 'crypto';
import { UsuariosRepository } from '../../../../../src/app/features/usuarios/repositories';
import { CadastrarUsuario } from '../../../../../src/app/features/usuarios/usecases';
import { Usuario } from '../../../../../src/app/models';
import { DatabaseConnection, RedisConnection } from '../../../../../src/main/database';

describe('Testes para o usecase de cadastrar usuário', () => {
	// MODULO QUE SERÁ MOCKADO
	jest.mock('../../../../../src/app/features/usuarios/repositories');

	// DEFINIÇÃO DO SUT
	function createSut() {
		return new CadastrarUsuario();
	}

	// HOOKS
	beforeAll(async () => {
		// executa algo antes da execução dos testes
		await DatabaseConnection.connect();
		await RedisConnection.connect();
	});

	beforeEach(() => {
		// executa algo antes da execução de cada teste
	});

	afterEach(() => {
		// executa algo depois da execução de cada teste
		jest.clearAllMocks();
	});

	afterAll(() => {
		// executa algo depois da execução de todos os testes
		// EX: fechar/destruir a conexão com as base de dados Relacional e Não-Relacional
	});

	test('Deve retornar true quando chamar o metodo execute passando um email que existe na base de dados', async () => {
		jest.spyOn(UsuariosRepository.prototype, 'verificarSeExisteUsuarioPorEmail').mockResolvedValue(true);

		const sut = createSut();
		const result = await sut.execute({ email: 'any_email', senha: 'any_value2' });

		expect(result.sucesso).toBe(false);
		expect(result.mensagem).toBe('Já existe um usuário cadastrado com esse e-mail.');
		expect(result.dados).toBeUndefined();
	});

	test('Deve cadastrar o usuario se o email passado para o execute não existir na base de dados', async () => {
		jest.spyOn(UsuariosRepository.prototype, 'verificarSeExisteUsuarioPorEmail').mockResolvedValue(false);

		const newUserMock = new Usuario(randomUUID(), 'any_email', 'any_senha');

		jest.spyOn(UsuariosRepository.prototype, 'cadastrar').mockResolvedValue(newUserMock);

		const sut = createSut();
		const result = await sut.execute({ email: 'any_email', senha: 'any_value' });

		expect(result).toEqual({
			sucesso: true,
			mensagem: 'Usuário cadastrado com sucesso!',
			dados: newUserMock.toJSON(),
		});

		// expect(result.sucesso).toBe(true);
		// expect(result.mensagem).toBe('Usuário cadastrado com sucesso!');
		// expect(result.dados).toBeDefined();
		// expect(result.dados).toEqual(newUserMock.toJSON());
	});
});
