import { databaseUsers } from '../../database';
import { User } from '../../models';
import { LoginDTO, UserDTO } from '../../usecases';

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

	findUserByCredentials(dados: LoginDTO) {
		// ou retorna uma string (ID) ou undefined (não achar o user pelas credenciais)
		const user = databaseUsers.find(
			(i) =>
				i.toJson().email === dados.email &&
				i.toJson().password === dados.password
		);

		if (!user) return;

		return user.toJson().id;
	}
}
