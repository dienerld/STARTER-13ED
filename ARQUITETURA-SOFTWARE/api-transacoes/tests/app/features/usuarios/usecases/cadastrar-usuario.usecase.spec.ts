import { UsuariosRepository } from '../../../../../src/app/features/usuarios/repositories';
import { CadastrarUsuario } from '../../../../../src/app/features/usuarios/usecases';
import { DatabaseConnection, RedisConnection } from '../../../../../src/main/database';

describe('Testes para o usecase de cadastrar usuário', () => {
	jest.mock('../../../../../src/app/features/usuarios/repositories');

	// DEFINIÇÃO DO SUT
	function createSut() {
		return new CadastrarUsuario();
	}

	// HOOKS
	beforeAll(async () => {
		await DatabaseConnection.connect();
		await RedisConnection.connect();
	});

	beforeEach(() => {});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {});

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

		const sut = createSut();
		const result = await sut.execute({ email: 'any_email', senha: 'any_value' });

		expect(result.sucesso).toBe(true);
		expect(result.mensagem).toBe('Usuário cadastrado com sucesso!');
		expect(result.dados).toBeDefined();
	});
});
