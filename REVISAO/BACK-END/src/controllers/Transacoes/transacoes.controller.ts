import { Request, Response } from 'express';
import { CadastrarTransacao } from '../../usecases';

export class TransacaoController {
	public static cadastrar(req: Request, res: Response) {
		const { idUsuario } = req.params;
		const { valor, tipo } = req.body;

		// chamar as regras de negocio
		const usecase = new CadastrarTransacao();
		const resultado = usecase.execute({ idUsuario, tipo, valor });

		if (!resultado.sucesso) {
			return res.status(401).json(resultado);
		}

		return res.status(200).json(resultado);
	}
}
