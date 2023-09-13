import { User } from "../../../models/user.model";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Result, ResultDTO } from "../../../shared/utils/result.helper";
import { UsersRepository } from "../repository/users.repository";

const PREFIX_CACHE = "list-users";

export class ListUsersUsecase {
	async execute(): Promise<ResultDTO> {
		const repository = new UsersRepository();
		const cacheRepository = new CacheRepository();

		const usersCache = await cacheRepository.get<User[]>(PREFIX_CACHE);

		let users = [];

		if (!usersCache) {
			const usersDB = (users = await repository.list());

			await cacheRepository.set(PREFIX_CACHE, usersDB);
		} else {
			users = usersCache;
		}

		return Result.success(200, "User successfully created", users);
	}
}
