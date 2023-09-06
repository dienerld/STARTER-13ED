import { User } from "../../../models/user.model";
import { CreateUserDTO } from "../DTO";

export class CreateUserUsecase {
	async execute({ name, password, role, username }: CreateUserDTO) {
		const newUser = new User(username, name, password, role);

		return newUser.toJSON();
	}
}
