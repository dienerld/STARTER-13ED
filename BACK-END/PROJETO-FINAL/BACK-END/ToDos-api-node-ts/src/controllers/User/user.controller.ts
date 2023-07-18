import { Request, Response } from 'express';
import { CreateUser } from '../../usecases';

export class UserController {
	create(req: Request, res: Response) {
		const { name, email, password } = req.body;

		const usecase = new CreateUser();

		const response = usecase.execute({ name, email, password });

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(201).json(response);
	}
}
