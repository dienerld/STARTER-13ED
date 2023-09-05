import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, CandidateJobEntity, UserEntity } from '.';

@Entity({ name: 'jobs' })
export class JobEntity extends BaseEntity {
	@Column()
	public description: string;

	@Column({ name: 'id_recruiter' })
	public idRecruiter: string;

	@Column({ name: 'company_name' })
	public companyName: string;

	@Column({ name: 'is_open' })
	public isOpen: boolean;

	@Column({ name: 'limit_date' })
	public limitDate: Date;

	@Column({ name: 'max_candidate' })
	public maxCandidate?: number;

	@ManyToOne(() => UserEntity, (entity) => entity.jobs)
	public recruiter: UserEntity;

	@OneToMany(() => CandidateJobEntity, (entity) => entity.job)
	public candidatesJob: CandidateJobEntity[];
}
