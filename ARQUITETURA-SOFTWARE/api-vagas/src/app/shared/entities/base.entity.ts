import { randomUUID } from 'crypto';
import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from 'typeorm';

export class BaseEntity {
	@PrimaryColumn()
	public id: string;

	@Column({ name: 'created_at' })
	public createdAt: Date;

	@Column({ name: 'updated_at' })
	public updatedAt: Date;

	@BeforeInsert()
	public beforeInsert() {
		this.id = randomUUID();
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	@BeforeUpdate()
	public beforeUpdate() {
		this.updatedAt = new Date();
	}
}
