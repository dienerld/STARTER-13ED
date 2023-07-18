import { databaseUsers } from '../../database';
import { User } from '../../models';
import { UserDTO } from '../../usecases';

export class UserRepository {
	//ver usuarios
	listUsers() {
		const users: User[] = databaseUsers; // 0x000021345 => referencia em memoria e pro valor

		return users.map((user) => user.toJson());
	}

	createUser(dados: UserDTO) {
		const user = new User(dados.name, dados.email, dados.password);
		databaseUsers.push(user);

		return user.toJson();
	}
}
