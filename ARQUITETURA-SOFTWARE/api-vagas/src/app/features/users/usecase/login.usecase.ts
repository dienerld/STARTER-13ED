import { bcrypt, jwt } from '../../../shared/utils';
import { Result, ResultDTO } from '../../../shared/utils/result.helper';
import { CreateUserDTO } from '../DTO';
import { UsersRepository } from '../repository/users.repository';

type LoginUserDTO = Omit<CreateUserDTO, 'name' | 'profile' | 'company'>;

export class LoginUserUsecase {
	async execute(data: LoginUserDTO): Promise<ResultDTO> {
		const repository = new UsersRepository();

		const userExists = await repository.findByUsername(data.username);

		if (!userExists) {
			return Result.error(404, 'User not found.');
		}

		const matchPassword = await bcrypt.compareHash(data.password, userExists.toJSONWithPassword().password);

		if (!matchPassword) {
			return Result.error(404, 'Username or password invalid.');
		}

		const userData = userExists.toJSON();
		const token = jwt.encoded(userData);

		return Result.success(200, 'User successfully created', {
			...userData,
			token,
		});
	}
}
