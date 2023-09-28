import { randomUUID } from 'crypto';
import { TransacoesRepository } from '../../../../../src/app/features/transacoes/repositories';
import { CadastrarTransacao } from '../../../../../src/app/features/transacoes/usecases';
import { UsuariosRepository } from '../../../../../src/app/features/usuarios/repositories';
import { DatabaseConnection, RedisConnection } from '../../../../../src/main/database';
import { createUsers } from '../../../../helpers/create-users.builder';

describe('Testes para o usecase de cadastrar uma transação', () => {
	function createSut() {
		return new CadastrarTransacao();
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
		await new TransacoesRepository().clear();
		await new UsuariosRepository().clear();
	});

	test('deve retornar um objeto de erro quando o usuario não existir', async () => {
		const sut = createSut();
		const resultado = await sut.execute({
			idUsuario: randomUUID(),
			valor: 0,
			tipo: 'entrada',
		});

		expect(resultado).toEqual({
			sucesso: false,
			mensagem: 'Usuário não encontrado. Não foi possível cadastrar a transação.',
			dados: {
				saldo: 0,
			},
		});
	});

	test('deve retornar um objeto de sucesso com os dados da transação cadastrada passando os valores corretamente', async () => {
		const [user] = await createUsers();

		const sut = createSut();
		const resultado = await sut.execute({
			idUsuario: user.model.toJSON().id,
			valor: 0,
			tipo: 'entrada',
		});

		expect(resultado.sucesso).toBe(true);
		expect(resultado.mensagem).toBe('Transação cadastrada com sucesso');
		expect(resultado.dados.saldo).toBe(0);
		expect(resultado.dados.transacao).toBeDefined();
		expect(resultado.dados.transacoes).toHaveLength(1);
	});
});
