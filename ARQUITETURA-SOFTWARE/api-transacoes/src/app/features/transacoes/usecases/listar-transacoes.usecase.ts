import { TipoTransacao, TransacaoJSON } from '../../../models';
import { CacheRepository } from '../../../shared/database/repositories';
import { UsuariosRepository } from '../../usuarios/repositories';
import { TransacoesRepository } from '../repositories';
import { RetornoTransacoes } from './cadastrar-transacao.usecase';
import { CalcularSaldoUsecase } from './calcular-saldo.usecase';

type ListarTransacoesDTO = {
	idUsuario: string;
	tipo?: TipoTransacao;
};

export class ListarTransacoes {
	public async execute(dados: ListarTransacoesDTO): Promise<RetornoTransacoes> {
		const { idUsuario, tipo } = dados;

		const repositoryUsuario = new UsuariosRepository();
		const repositoryTransacoes = new TransacoesRepository();
		const cacheRepository = new CacheRepository();

		const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(idUsuario);

		if (!usuarioEncontrado) {
			return {
				sucesso: false,
				mensagem: 'Usuário não encontrado. Não foi possível listar as transações.',
				dados: {
					saldo: 0,
				},
			};
		}

		// ANTES DE BUSCAR NA BASE DE DADOS, BUSCAMOS NO CACHE
		const transacoesCache = await cacheRepository.get<TransacaoJSON[]>(`transacoes-usuario-${idUsuario}`);
		let transacoes: TransacaoJSON[] = [];

		if (!transacoesCache) {
			const transacoesPrincipal = await repositoryTransacoes.listarTransacoesDeUmUsuario(idUsuario);
			transacoes = transacoesPrincipal.map((t) => t.toJSON());

			await cacheRepository.set<TransacaoJSON[]>(`transacoes-usuario-${idUsuario}`, transacoes);
		} else {
			transacoes = transacoesCache;
		}

		const saldo = new CalcularSaldoUsecase().execute(transacoes);

		if (tipo) {
			transacoes = transacoes.filter((t) => t.tipo === tipo);
		}

		return {
			sucesso: true,
			mensagem: 'Transações do usuário listadas com sucesso',
			dados: {
				saldo,
				transacoes,
			},
		};
	}
}
