import { transacoes } from '../../database';
import { TipoTransacao, Transacao, TransacaoJSON, Usuario } from '../../models';

type CadastrarDTO = {
	usuario: Usuario;
	valor: number;
	tipo: TipoTransacao;
};

export class TransacoesRepository {
	public cadastrar(dados: CadastrarDTO): Transacao {
		const { valor, tipo, usuario } = dados;

		const novaTransacao = new Transacao(valor, tipo, usuario);

		transacoes.push(novaTransacao);

		return novaTransacao;
	}

	public calcularSaldo(idUsuario: string): number {
		const transacoesUsuario = transacoes.filter(
			(transacao) => transacao.toJSON().autor.id === idUsuario
		);

		if (!transacoesUsuario.length) return 0;

		const soma = transacoesUsuario.reduce((result, transacao) => {
			const transacaoJSON = transacao.toJSON();

			if (transacaoJSON.tipo === 'entrada') {
				return result + transacaoJSON.valor;
			} else {
				return result - transacaoJSON.valor;
			}
		}, 0);

		return soma;
	}

	public listarTransacoesDeUmUsuario(idUsuario: string): TransacaoJSON[] {
		return transacoes
			.filter((transacao) => transacao.toJSON().autor.id === idUsuario)
			.map((t) => t.toJSON());
	}
}
