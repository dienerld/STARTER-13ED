import { bcrypt } from '../../../shared/utils';
import { Result, ResultDTO } from '../../../shared/utils/result.helper';
import { CreateUserDTO } from '../DTO';
import { UsersRepository } from '../repository/users.repository';

export class CreateUserUsecase {
	async execute(data: CreateUserDTO): Promise<ResultDTO> {
		const repository = new UsersRepository();

		const userExists = await repository.findByUsername(data.username);

		if (userExists) {
			return Result.error(400, 'User already exists');
		}

		const passwordHash = await bcrypt.generateHash(data.password);
		data.password = passwordHash;

		const newUser = await repository.save(data);

		return Result.success(200, 'User successfully created', newUser.toJSON());
	}
}
