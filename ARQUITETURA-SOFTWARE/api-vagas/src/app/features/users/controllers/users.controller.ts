import { Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { CreateUserDTO } from "../DTO";
import { CreateUserUsecase } from "../usecase/create.usecase";

export class UserController {
	static async create(req: Request, res: Response) {
		const user: CreateUserDTO = req.body;

		try {
			const usecase = new CreateUserUsecase();

			const response = await usecase.execute(user);

			return httpHelper.success(res, response, "Usuário criado com sucesso", 201);
		} catch (err: any) {
			return httpHelper.badRequestError(res, err.message, 400);
		}
	}
}
