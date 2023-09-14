import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity, JobEntity, UserEntity } from '.';
import { CandidateJobStatus } from '../enums';

@Entity({ name: 'candidates_jobs' })
export class CandidateJobEntity extends BaseEntity {
	@Column({ name: 'id_job' })
	public jobId: string;

	@Column({ name: 'id_candidate' })
	public candidateId: string;

	@Column({ type: 'enum', enum: CandidateJobStatus })
	public status: CandidateJobStatus;

	@ManyToOne(() => JobEntity, (entity) => entity.candidatesJob)
	@JoinColumn({ name: 'id_job', referencedColumnName: 'id' })
	public job: JobEntity;

	@ManyToOne(() => UserEntity, (entity) => entity.candidatesJob)
	@JoinColumn({ name: 'id_candidate', referencedColumnName: 'id' })
	public candidate: UserEntity;
}
