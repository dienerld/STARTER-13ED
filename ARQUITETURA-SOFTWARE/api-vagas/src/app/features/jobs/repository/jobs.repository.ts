import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Job } from "../../../models/job.model";
import { JobEntity } from "../../../shared/entities";
import { CreateJobDTO } from "../DTO";

export class JobsRepository {
	private manager = DatabaseConnection.connection.manager;

	async save(job: CreateJobDTO): Promise<Job> {
		const createdJob = this.manager.create(JobEntity, job);

		await this.manager.save(createdJob);

		return this.entityToModel(createdJob);
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
}
