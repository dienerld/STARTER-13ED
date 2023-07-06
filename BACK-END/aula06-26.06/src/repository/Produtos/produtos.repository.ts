import { randomUUID } from 'crypto';
import { Produto } from '../../classes';
import { produtos } from '../../database';
import { AdicionarProdutoDTO } from '../../usecases/Produtos';

export class ProdutosRepository {
	verificarNumeroDeSerie(numeroSerie: string) {
		return produtos.some((p) => p.toJSON().numeroSerie === numeroSerie);
	}

	cadastrarProduto(produto: AdicionarProdutoDTO): Produto {
		const { descricao, nome, numeroSerie, preco } = produto;
		const novoProduto = new Produto({
			id: randomUUID(),
			descricao,
			nome,
			numeroSerie,
			preco,
		});

		produtos.push(novoProduto);

		return novoProduto;
	}
}
