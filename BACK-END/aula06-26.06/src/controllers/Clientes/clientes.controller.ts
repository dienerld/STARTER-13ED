import { Request, Response } from 'express';
import { CadastrarCliente } from '../../usecases/Clientes';

export class ClientesController {
	// CREATE
	public cadastrar(request: Request, response: Response) {
		const { nome_completo, cpf, telefone, email, senha } = request.body;

		// precisa passar para a camada de regra de negocio
		const usecase = new CadastrarCliente({
			nome: nome_completo,
			telefone: telefone,
			cpf: cpf,
			email: email,
			senha: senha,
		});

		const resposta = usecase.execute();

		if (!resposta.sucesso) {
			return response.status(400).json(resposta);
		}

		return response.status(201).json(resposta);
	}

	// LIST ALL

	// LIST BY ID

	// UPDATE

	// DELETE
}
