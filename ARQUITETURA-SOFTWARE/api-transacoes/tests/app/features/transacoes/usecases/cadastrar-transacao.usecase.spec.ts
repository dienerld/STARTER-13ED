import { randomUUID } from 'crypto';
import { TransacoesRepository } from '../../../../../src/app/features/transacoes/repositories';
import { CadastrarTransacao } from '../../../../../src/app/features/transacoes/usecases';
import { UsuariosRepository } from '../../../../../src/app/features/usuarios/repositories';
import { Transacao, Usuario } from '../../../../../src/app/models';
import { DatabaseConnection, RedisConnection } from '../../../../../src/main/database';

describe('Testes para o usecase de cadastrar uma transação', () => {
	jest.mock('../../../../../src/app/features/transacoes/repositories');
	jest.mock('../../../../../src/app/features/usuarios/repositories');
	jest.mock('../../../../../src/app/shared/database/repositories');

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

	beforeAll(() => {
		jest.clearAllMocks();
	});

	test('deve retornar um objeto de erro quando o usuario não existir', async () => {
		jest.spyOn(UsuariosRepository.prototype, 'buscaUsuarioPorID').mockResolvedValue(undefined);

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
		const usuarioFake = new Usuario(randomUUID(), 'any_email', 'any_senha');
		jest.spyOn(UsuariosRepository.prototype, 'buscaUsuarioPorID').mockResolvedValue(usuarioFake);

		const transacaoFake = new Transacao(randomUUID(), 0, 'entrada', usuarioFake);
		jest.spyOn(TransacoesRepository.prototype, 'cadastrar').mockResolvedValue(transacaoFake);

		const saldoFake = 0;
		jest.spyOn(TransacoesRepository.prototype, 'calcularSaldo').mockResolvedValue(saldoFake);
		jest.spyOn(TransacoesRepository.prototype, 'listarTransacoesDeUmUsuario').mockResolvedValue([transacaoFake]);

		const sut = createSut();
		const resultado = await sut.execute({
			idUsuario: usuarioFake.toJSON().id,
			valor: 0,
			tipo: 'entrada',
		});

		expect(resultado).toEqual({
			sucesso: true,
			mensagem: 'Transação cadastrada com sucesso',
			dados: {
				saldo: saldoFake,
				transacao: transacaoFake.toJSON(),
				transacoes: [transacaoFake].map((t) => t.toJSON()),
			},
		});
	});
});
