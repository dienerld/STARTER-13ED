import { CreateUserDTO } from "../DTO";
import { UsersRepository } from "../repository/users.repository";

export class CreateUserUsecase {
	async execute(data: CreateUserDTO) {
		const repository = new UsersRepository();

		const userExists = await repository.findByUsername(data.username);

		if (userExists) {
			return new Error("Usuário já cadastrado");
		}

		const newUser = await repository.save(data);

		return newUser;
	}
}
