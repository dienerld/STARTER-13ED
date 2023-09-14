import { Request, Response } from 'express';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';
import { ApplyJobUsecase } from '../usecase/apply-job.usecase';
import { CreateJobUsecase } from '../usecase/create.usecase';

export class JobsController {
	static async createJob(req: Request, res: Response) {
		const dados = req.body;
		const { id } = req.user;

		console.log();

		try {
			const usecase = new CreateJobUsecase();
			const result = await usecase.execute({
				idRecruiter: id,
				...dados,
			});

			return httpHelper.success(res, result);
		} catch (err: any) {
			return httpHelper.badRequestError(res, Result.error(500, err.toString()));
		}
	}

	static async applyJob(req: Request, res: Response) {
		const { idJob } = req.params;
		const { id } = req.user;

		try {
			const usecase = new ApplyJobUsecase();
			const result = await usecase.execute(idJob, id);

			if (!result.ok) {
				return httpHelper.badRequestError(res, result);
			}

			return httpHelper.success(res, result);
		} catch (err: any) {
			return httpHelper.badRequestError(res, Result.error(500, err.toString()));
		}
	}
}
