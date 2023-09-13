import { TransacaoJSON } from '../../../models';
import { CacheRepository } from '../../../shared/database/repositories';
import { UsuariosRepository } from '../../usuarios/repositories';
import { TransacoesRepository } from '../repositories';
import { RetornoTransacoes } from './cadastrar-transacao.usecase';

type ListarPorIdDTO = {
	idUsuario: string;
	idTransacao: string;
};

export class ListarPorID {
	public async execute(dados: ListarPorIdDTO): Promise<RetornoTransacoes> {
		const { idUsuario, idTransacao } = dados;

		const repositoryUsuario = new UsuariosRepository();
		const repositoryTransacao = new TransacoesRepository();
		const cacheRepository = new CacheRepository();

		const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(idUsuario);

		if (!usuarioEncontrado) {
			return {
				sucesso: false,
				mensagem: 'Usuário não encontrado. Não foi possível listar a transação.',
				dados: {
					saldo: 0,
				},
			};
		}

		const saldo = await repositoryTransacao.calcularSaldo(idUsuario);
		const trancacaoCache = await cacheRepository.get<TransacaoJSON>(`transacao-${idTransacao}`);

		if (!trancacaoCache) {
			const transacao = await repositoryTransacao.buscarPorID(idUsuario, idTransacao);

			if (!transacao) {
				return {
					sucesso: false,
					mensagem: 'Transação não encontrada.',
					dados: {
						saldo: 0,
					},
				};
			}

			await cacheRepository.set<TransacaoJSON>(`transacao-${idTransacao}`, transacao.toJSON());

			return {
				sucesso: true,
				mensagem: 'Transação buscada com sucesso',
				dados: {
					saldo,
					transacao: transacao.toJSON(),
				},
			};
		}

		return {
			sucesso: true,
			mensagem: 'Transação em cache buscada com sucesso',
			dados: {
				saldo,
				transacao: trancacaoCache,
			},
		};
	}
}
