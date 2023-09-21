import { DatabaseConnection } from '../../../../main/database/typeorm.connection';
import { Job } from '../../../models/job.model';
import { User } from '../../../models/user.model';
import { JobEntity, UserEntity } from '../../../shared/entities';
import { CreateJobDTO } from '../DTO';

export class JobsRepository {
  private _manager = DatabaseConnection.connection.manager;

  async save(job: CreateJobDTO): Promise<Job> {
    const createdJob = this._manager.create(JobEntity, {
      ...job,
    });

    await this._manager.save(createdJob);

    return this.entityToModel(createdJob);
  }

  async getJobByID(idJob: string): Promise<Job | undefined> {
    const job = await this._manager.findOneBy(JobEntity, { id: idJob });

    if (!job) return undefined;

    return this.entityToModel(job);
  }

  async listCandidatesByJob(
    id: string,
    idRecruiter: string
  ): Promise<User[] | undefined> {
    const job = await this._manager.findOne(JobEntity, {
      where: {
        id,
        idRecruiter,
      },
      relations: {
        candidatesJob: true,
      },
    });

    if (!job) return undefined;

    return job.candidatesJob.map((c) => this.entityToModelUser(c.candidate));
  }
  private entityToModel({
    id,
    description,
    isOpen,
    limitDate,
    idRecruiter,
    companyName,
    maxCandidate,
  }: JobEntity): Job {
    return new Job(
      id,
      description,
      companyName,
      limitDate,
      isOpen,
      idRecruiter,
      maxCandidate
    );
  }

  private entityToModelUser(data: UserEntity): User {
    return new User(
      data.id,
      data.username,
      data.name,
      data.password,
      data.profile,
      data.company
    );
  }
}
