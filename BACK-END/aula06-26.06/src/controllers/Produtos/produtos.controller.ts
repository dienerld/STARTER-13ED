import { Request, Response } from 'express';
import { AdicionarProduto, AdicionarProdutoDTO } from '../../usecases/Produtos';

export class ProdutosController {
	public criar(req: Request, res: Response) {
		const { nome, descricao, numeroSerie, preco }: AdicionarProdutoDTO =
			req.body;

		const usecase = new AdicionarProduto({
			descricao,
			nome,
			numeroSerie,
			preco,
		});

		const retorno = usecase.execute();

		if (!retorno.sucesso) {
			return res.status(400).json(retorno);
		}

		return res.status(201).json(retorno);
	}
}
