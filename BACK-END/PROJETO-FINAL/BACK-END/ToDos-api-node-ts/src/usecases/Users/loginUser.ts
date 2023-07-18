import { UserRepository } from '../../repositories';

export type LoginDTO = {
	email: string;
	password: string;
};

type LoginUserResponse = {
	success: boolean;
	message: string;
	data?: string;
};

export class LoginUser {
	execute(dados: LoginDTO): LoginUserResponse {
		const repository = new UserRepository();

		const searchUser = repository.findUserByCredentials(dados);

		if (!searchUser) {
			return {
				success: false,
				message: 'Senha e/ou email incorretos!',
				data: searchUser,
			};
		}

		return {
			success: true,
			message: 'Credenciais corretas!',
			data: searchUser,
		};
	}
}
