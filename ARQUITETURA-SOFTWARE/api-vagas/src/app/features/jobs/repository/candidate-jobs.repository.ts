import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { CandidateJobEntity } from "../../../shared/entities";
import { CandidateJobStatus } from "../../../shared/enums";
import { ApplyJobDTO } from "../DTO";

export class CandidateJobsRepository {
  private _manager = DatabaseConnection.connection.manager;

  // CADASTRAR UMA VAGA
  async save(data: ApplyJobDTO): Promise<void> {
    const candidateJobEntity = this._manager.create(CandidateJobEntity, {
      jobId: data.idJob,
      candidateId: data.idCandidate,
      status: CandidateJobStatus.IN_PROCESS,
    });

    await this._manager.save(candidateJobEntity);
  }

  // Verificar se o candidato já se aplicou a mesma vaga
  async verifyApplyCandidateByID(data: ApplyJobDTO): Promise<boolean> {
    const candidateJobFound = await this._manager.find(CandidateJobEntity, {
      where: {
        candidateId: data.idCandidate,
        jobId: data.idJob,
      },
    });

    return !!candidateJobFound.length;
  }

  // TOTAL DE CANDIDADOS APLICADOS À VAGA
  async getTotalApplies(idJob: string): Promise<number> {
    const total = await this._manager.count(CandidateJobEntity, {
      where: {
        jobId: idJob,
      },
    });

    return total;
  }

  async listApplicationsByCandidate(id: string): Promise<CandidateJobEntity[]> {
    const applicationsFound = await this._manager.find(CandidateJobEntity, {
      where: {
        candidateId: id,
      },
      relations: {
        job: true,
      },
    });

    return applicationsFound;
  }
}
