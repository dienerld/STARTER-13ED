import { Result, ResultDTO } from '../../../shared/utils/result.helper';
import { ApplyJobDTO } from '../DTO';
import { CandidateJobsRepository, JobsRepository } from '../repository';

export class ApplyJobUsecase {
	async execute({ idJob, idCandidate }: ApplyJobDTO): Promise<ResultDTO> {
		const jobRepo = new JobsRepository();
		const candidateJobRepo = new CandidateJobsRepository();

		const job = await jobRepo.getJobByID(idJob);

		if (!job) {
			return Result.error(404, 'Job not found');
		}

		const jobJSON = job.toJSON();

		//- A data limite da vaga já foi alcançada
		if (new Date().getTime() > jobJSON.limitDate.getTime()) {
			return Result.error(400, 'Max date is overdue.');
		}

		//- A vaga não está ativa
		if (!jobJSON.isOpen) {
			return Result.error(400, 'Job is close');
		}

		//- A vaga já está lotada de candidatos, quando tiver número máximo definido
		if (jobJSON.maxCandidates) {
			const total = await candidateJobRepo.getTotalApplies(idJob);

			if (total >= jobJSON.maxCandidates) {
				return Result.error(400, 'Job with maximum limit of candidates.');
			}
		}

		const isApply = await candidateJobRepo.verifyApplyCandidateByID({ idCandidate, idJob });

		// - O candidato já se aplicou a mesma vaga
		if (isApply) {
			return Result.error(400, 'Candidate is already registered for the job.');
		}

		await candidateJobRepo.save({ idJob, idCandidate });

		return Result.success(200, 'Candidate successfully applied for the job!', undefined);
	}
}
