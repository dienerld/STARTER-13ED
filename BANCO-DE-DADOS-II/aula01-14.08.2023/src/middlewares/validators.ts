import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';

export class Validators {
	public static clearFomatting(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const cpf = req.body.cpf as string;

		const onlyCpf = cpf.replace(/\W/g, '');

		req.body.cpf = onlyCpf;

		next();
	}

	public static validateCpf(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const { cpf } = request.body;

		if (!cpfValidator.isValid(cpf)) {
			return response.status(400).json({ error: 'CPF inválido' });
		}

		return next();
	}
}
