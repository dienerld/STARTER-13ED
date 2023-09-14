import { UserJSON } from "../../../models/user.model";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Profile } from "../../../shared/enums";
import { Result, ResultDTO } from "../../../shared/utils/result.helper";
import { UsersRepository } from "../repository/users.repository";

const PREFIX_CACHE = "list-users";

export class ListUsersUsecase {
  async execute(filtro?: keyof typeof Profile): Promise<ResultDTO> {
    const repository = new UsersRepository();
    const cacheRepository = new CacheRepository();

    // NO REDIS NÃO É ARMAZENADO INSTANCIA DE CLASSES
    const usersCache = await cacheRepository.get<UserJSON[]>(PREFIX_CACHE);

    let users: UserJSON[] = [];

    if (!usersCache) {
      const usersDB = await repository.list();
      users = usersDB.map((u) => u.toJSON());

      await cacheRepository.set(PREFIX_CACHE, users);
    } else {
      users = usersCache;
    }

    if (filtro) {
      users = users.filter((u) => u.profile === filtro);
    }

    return Result.success(200, "User successfully created", users);
  }
}
