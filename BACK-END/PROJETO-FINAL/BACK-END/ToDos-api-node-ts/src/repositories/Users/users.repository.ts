import { databaseUsers } from '../../database';
import { User } from '../../models';
import { LoginDTO, UserDTO } from '../../usecases';

export class UserRepository {
	listUsers() {
		const users: User[] = databaseUsers;

		return users.map((user) => user.toJson());
	}

	createUser(dados: UserDTO) {
		const user = new User(dados.name, dados.email, dados.password);
		databaseUsers.push(user);

		return user.toJson();
	}

	findUserByCredentials(dados: LoginDTO) {
		const user = databaseUsers.find(
			(i) =>
				i.toJson().email === dados.email &&
				i.toJson().password === dados.password
		);

		if (!user) return;

		return user.toJson().id;
	}
}
