import { Request, Response } from 'express';
import { CadastrarUsuario } from '../../usecases';

export class UsuariosController {
	public static cadastrar(req: Request, res: Response) {
		const { email, senha } = req.body;

		// chamar as regras de negócio
		const usecase = new CadastrarUsuario();
		const resposta = usecase.execute({ email, senha });

		if (!resposta.sucesso) {
			return res.status(400).json(resposta);
		}

		return res.status(201).json(resposta);
	}

	public static logar(req: Request, res: Response) {}
}
