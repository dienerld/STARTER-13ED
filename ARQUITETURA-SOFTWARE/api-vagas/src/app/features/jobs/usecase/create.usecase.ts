import { Result, ResultDTO } from '../../../shared/utils/result.helper';
import { CreateJobDTO } from '../DTO';
import { JobsRepository } from '../repository';

export class CreateJobUsecase {
	async execute(data: CreateJobDTO): Promise<ResultDTO> {
		const repository = new JobsRepository();

		const job = await repository.save(data);

		return Result.success(200, 'Job created successfully', job.toJSON());
	}
}
