import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, CandidateJobEntity, JobEntity } from '.';
import { Profile } from '../enums';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	@Column()
	public name: string;

	@Column()
	public username: string;

	@Column({ type: 'enum', enum: Profile })
	public profile: Profile;

	@Column()
	public password: string;

	@Column()
	public company: string;

	@OneToMany(() => JobEntity, (entity) => entity.recruiter)
	public jobs: JobEntity[];

	@OneToMany(() => CandidateJobEntity, (entity) => entity.candidate)
	public candidatesJob: CandidateJobEntity[];
}
