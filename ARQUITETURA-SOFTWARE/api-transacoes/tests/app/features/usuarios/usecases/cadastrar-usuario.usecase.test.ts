import { UsuariosRepository } from '../../../../../src/app/features/usuarios/repositories';
import { CadastrarUsuario } from '../../../../../src/app/features/usuarios/usecases';
import { DatabaseConnection, RedisConnection } from '../../../../../src/main/database';
import { createUsers } from '../../../../helpers/create-users.builder';

describe('Testes para o usecase de cadastrar usuário', () => {
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

	afterEach(async () => {
		await new UsuariosRepository().clear();
	});

	test('deve retornar um objeto de erro quando o usuario existir', async () => {
		const [user] = await createUsers();
		const sut = createSut();

		const resultado = await sut.execute({ email: user.json.email, senha: 'any_senha' });

		expect(resultado.sucesso).toBe(false);
		expect(resultado.mensagem).toBe('Já existe um usuário cadastrado com esse e-mail.');
		expect(resultado.dados).toBeUndefined();
	});

	test('Deve cadastrar um usuario passando um email que não existe na base de dados', async () => {
		const sut = createSut();
		const result = await sut.execute({ email: 'any_email', senha: 'any_senha' });

		expect(result.sucesso).toBe(true);
		expect(result.mensagem).toBe('Usuário cadastrado com sucesso!');
		expect(result.dados).toBeTruthy();
	});
});
