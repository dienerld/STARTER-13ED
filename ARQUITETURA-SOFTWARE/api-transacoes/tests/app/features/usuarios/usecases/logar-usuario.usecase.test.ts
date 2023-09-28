import { UsuariosRepository } from '../../../../../src/app/features/usuarios/repositories';
import { LogarUsuario } from '../../../../../src/app/features/usuarios/usecases';
import { DatabaseConnection, RedisConnection } from '../../../../../src/main/database';
import { createUsers } from '../../../../helpers/create-users.builder';

describe('Testes para o usecase de logar usuário', () => {
	function createSut() {
		return new LogarUsuario();
	}

	beforeAll(async () => {
		await DatabaseConnection.connect();
		await RedisConnection.connect();
	});

	afterAll(async () => {
		await DatabaseConnection.destroy();
		await RedisConnection.destroy();
	});

	afterEach(async () => {
		await new UsuariosRepository().clear();
	});

	test('deve retornar um objeto de erro quando o usuario não existir', async () => {
		const sut = createSut();

		const resultado = await sut.execute({ email: 'any_email', senha: 'any_senha' });

		expect(resultado).toEqual({
			sucesso: false,
			mensagem: 'Usuário não autorizado.',
		});
	});

	test('deve retornar um objeto de sucesso quando o usuario existir na Base de Dados', async () => {
		const [user] = await createUsers();

		const sut = createSut();

		const resultado = await sut.execute({ email: user.json.email, senha: user.json.senha });

		expect(resultado).toEqual({
			sucesso: true,
			mensagem: 'Usuário autorizado.',
			dados: user.model.toJSON(),
		});
	});
});
