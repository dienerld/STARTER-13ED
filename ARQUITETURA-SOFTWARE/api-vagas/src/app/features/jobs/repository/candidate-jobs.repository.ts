import { DatabaseConnection } from '../../../../main/database/typeorm.connection';
import { CandidateJobEntity } from '../../../shared/entities';
import { CandidateJobStatus } from '../../../shared/enums';

interface ApplyJobDTO {
	idCandidate: string;
	idJob: string;
}

export class CandidateJobsRepository {
	private _manager = DatabaseConnection.connection.manager;

	async save(data: ApplyJobDTO): Promise<void> {
		const candidateJobEntity = this._manager.create(CandidateJobEntity, {
			jobId: data.idJob,
			candidateId: data.idCandidate,
			status: CandidateJobStatus.IN_PROCESS,
		});

		await this._manager.save(candidateJobEntity);
	}

	// Verificar se o candidato já se aplicou a mesma vaga
	async verifyApplyCandidateByID(idCandidate: string, idJob: string): Promise<boolean> {
		const candidateJobFound = await this._manager.find(CandidateJobEntity, {
			where: [
				{
					candidateId: idCandidate,
					jobId: idJob,
				},
			],
		});

		return !!candidateJobFound.length;
	}

	// get total candidatos
	async getTotal(idJob: string): Promise<number> {
		const total = await this._manager.count(CandidateJobEntity, {
			where: {
				jobId: idJob,
			},
		});

		return total;
	}
}
