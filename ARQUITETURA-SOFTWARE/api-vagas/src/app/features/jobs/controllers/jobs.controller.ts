import { Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { Result } from "../../../shared/utils/result.helper";
import { CreateJobDTO } from "../DTO";
import { CreateJobUsecase } from "../usecase/create.usecase";

export class JobsController {
	static async createJob(req: Request, res: Response) {
		const createJobData: CreateJobDTO = req.body;

		try {
			const usecase = new CreateJobUsecase();
			const result = await usecase.execute(createJobData);

			if (!result.ok) {
				return httpHelper.badRequestError(res, result);
			}

			return httpHelper.success(res, result);
		} catch (err: any) {
			return httpHelper.badRequestError(res, Result.error(500, err.toString()));
		}
	}
}
