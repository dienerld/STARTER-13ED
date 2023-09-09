import { DatabaseConnection } from '../../../../main/database/typeorm.connection';
import { User } from '../../../models/user.model';
import { UserEntity } from '../../../shared/entities';
import { CreateUserDTO } from '../DTO';

export class UsersRepository {
	private manager = DatabaseConnection.connection.manager;

	async save(user: CreateUserDTO): Promise<User> {
		const createdUser = this.manager.create(UserEntity, { ...user });

		await this.manager.save(createdUser);

		return this.entityToModel(createdUser);
	}

	async list(): Promise<User[]> {
		const listUsers = await this.manager.find(UserEntity);

		return listUsers.map((u) => this.entityToModel(u));
	}

	async findByUsername(username: string): Promise<User | null> {
		const usernameExists = await this.manager.findOneBy(UserEntity, { username });

		if (!usernameExists) {
			return null;
		}

		return this.entityToModel(usernameExists);
	}

	private entityToModel(data: UserEntity): User {
		return new User(data.id, data.username, data.name, data.password, data.profile, data.company);
	}
}
