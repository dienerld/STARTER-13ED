import { randomUUID } from 'crypto';
import { UsuariosRepository } from '../../../../../src/app/features/usuarios/repositories';
import { CadastrarUsuario } from '../../../../../src/app/features/usuarios/usecases';
import { Usuario } from '../../../../../src/app/models';
import { DatabaseConnection, RedisConnection } from '../../../../../src/main/database';

describe('Testes para o usecase de cadastrar usuário', () => {
	jest.mock('../../../../../src/app/features/usuarios/repositories');

	function createSut() {
		return new CadastrarUsuario();
	}

	beforeAll(async () => {
		await DatabaseConnection.connect();
		await RedisConnection.connect();
	});

	afterAll(async () => {
		await DatabaseConnection.destroy();
		await RedisConnection.destroy();
	});

	beforeAll(() => {
		jest.clearAllMocks();
	});

	test('deve retornar um objeto de erro quando o usuario existir', async () => {
		jest.spyOn(UsuariosRepository.prototype, 'verificarSeExisteUsuarioPorEmail').mockResolvedValue(true);

		const sut = createSut();

		const resultado = await sut.execute({ email: 'any_email', senha: 'any_senha' });

		expect(resultado.sucesso).toBe(false);
		expect(resultado.mensagem).toBe('Já existe um usuário cadastrado com esse e-mail.');
		expect(resultado.dados).toBeUndefined();
	});

	test('Deve cadastrar um usuario passando um email que não existe na base de dados', async () => {
		const usuarioFake = new Usuario(randomUUID(), 'any_email', 'any_senha');

		jest.spyOn(UsuariosRepository.prototype, 'verificarSeExisteUsuarioPorEmail').mockResolvedValue(false);

		jest.spyOn(UsuariosRepository.prototype, 'cadastrar').mockResolvedValue(usuarioFake);

		const sut = createSut();
		const result = await sut.execute({ email: 'any_email', senha: 'any_senha' });

		expect(result).toEqual({
			sucesso: true,
			mensagem: 'Usuário cadastrado com sucesso!',
			dados: usuarioFake.toJSON(),
		});
	});
});
