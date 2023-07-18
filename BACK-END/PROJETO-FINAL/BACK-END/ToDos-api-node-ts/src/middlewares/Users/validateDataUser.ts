import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../../usecases';

export function validateDataUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const user: UserDTO = req.body;

	if (!user.email || !user.name || !user.password) {
		return res
			.status(400)
			.json({ message: 'Insira os dados para cadastrar o usúario.' });
	}

	if (!user.email.includes('@') || !user.email.includes('.com')) {
		return res.status(400).json({ message: 'Insira um email válido.' });
	}

	if (user.name.length < 3) {
		return res
			.status(400)
			.json({ message: 'Insira no mínimo 3 caracteres para nome.' });
	}

	if (user.password.length < 6) {
		return res
			.status(400)
			.json({ message: 'Insira no mínimo 6 caracteres para senha.' });
	}

	next();
}
