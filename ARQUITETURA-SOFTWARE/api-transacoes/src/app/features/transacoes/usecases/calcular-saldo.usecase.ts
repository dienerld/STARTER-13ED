import { TransacaoJSON } from '../../../models';

export class CalcularSaldoUsecase {
	execute(transacoes: TransacaoJSON[]): number {
		if (!transacoes.length) return 0;

		const soma = transacoes.reduce((result, transacao) => {
			if (transacao.tipo === 'entrada') {
				return result + transacao.valor;
			} else {
				return result - transacao.valor;
			}
		}, 0);

		return soma;
	}
}
