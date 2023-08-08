import { NextFunction, Request, Response } from 'express';

export function validarValorETipoTransacao(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { valor, tipo } = req.body;

	if (typeof valor !== 'number') {
		return res.status(400).json({
			sucesso: false,
			mensagem: 'O valor precisa ser do tipo numérico.',
		});
	}

	if (tipo !== 'entrada' && tipo !== 'saida') {
		return res.status(400).json({
			sucesso: false,
			mensagem: 'O tipo precisa ser "entrada" ou "saida".',
		});
	}

	next();
}
