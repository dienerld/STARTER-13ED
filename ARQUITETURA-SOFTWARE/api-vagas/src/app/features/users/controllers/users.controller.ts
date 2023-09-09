import { Request, Response } from 'express';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';
import { CreateUserDTO } from '../DTO';
import { CreateUserUsecase } from '../usecase/create.usecase';
import { ListUsersUsecase } from '../usecase/list-all.usecase';
import { LoginUserUsecase } from '../usecase/login.usecase';

export class UserController {
	static async createUser(req: Request, res: Response) {
		const user: CreateUserDTO = req.body;

		try {
			const usecase = new CreateUserUsecase();
			const result = await usecase.execute(user);

			if (!result.ok) {
				return httpHelper.badRequestError(res, result);
			}

			return httpHelper.success(res, result);
		} catch (err: any) {
			return httpHelper.badRequestError(res, Result.error(500, err.toString()));
		}
	}
	static async createCadidate(req: Request, res: Response) {
		const user: CreateUserDTO = req.body;

		try {
			const usecase = new CreateUserUsecase();
			const result = await usecase.execute(user);

			if (!result.ok) {
				return httpHelper.badRequestError(res, result);
			}

			return httpHelper.success(res, result);
		} catch (err: any) {
			return httpHelper.badRequestError(res, Result.error(500, err.toString()));
		}
	}

	static async login(req: Request, res: Response) {
		const { username, password }: CreateUserDTO = req.body;

		try {
			const usecase = new LoginUserUsecase();
			const result = await usecase.execute({
				username,
				password,
			});

			if (!result.ok) {
				return httpHelper.badRequestError(res, result);
			}

			return httpHelper.success(res, result);
		} catch (err: any) {
			return httpHelper.badRequestError(res, Result.error(500, err.toString()));
		}
	}

	static async list(_: Request, res: Response) {
		try {
			const usecase = new ListUsersUsecase();
			const result = await usecase.execute();

			return httpHelper.success(res, result);
		} catch (err: any) {
			return httpHelper.badRequestError(res, Result.error(500, err.toString()));
		}
	}
}
