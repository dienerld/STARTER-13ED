import { Result, ResultDTO } from '../../../shared/utils/result.helper';
import { UsersRepository } from '../repository/users.repository';

export class ListUsersUsecase {
	async execute(): Promise<ResultDTO> {
		const repository = new UsersRepository();

		const users = await repository.list();

		return Result.success(
			200,
			'User successfully created',
			users.map((u) => u.toJSON())
		);
	}
}
