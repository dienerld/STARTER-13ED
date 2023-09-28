import { UsersRepository } from "../../../../../src/app/features/users/repository/users.repository";
import { ListUsersUsecase } from "../../../../../src/app/features/users/usecase/list-all.usecase";
import { User } from "../../../../../src/app/models/user.model";
import { CacheRepository } from "../../../../../src/app/shared/cache/cache.repository";
import { Profile } from "../../../../../src/app/shared/enums";
import { RedisConnection } from "../../../../../src/main/database/ioredis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";

describe("[Usecase - User] - ListAll", () => {
  jest.mock(
    "../../../../../src/app/features/users/repository/users.repository"
  );

  jest.mock("ioredis", () => require("ioredis-mock"));

  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
  });

  it("should return status 200 whitout users", async () => {
    jest.spyOn(UsersRepository.prototype, "list").mockResolvedValueOnce([]);
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce(undefined);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValueOnce("OK");
    const usecase = new ListUsersUsecase();
    const response = await usecase.execute();

    expect(response.code).toBe(200);
    expect(response.data).toStrictEqual([]);
  });

  it("should return status 200 when users in database", async () => {
    const user = new User(
      "any_id",
      "any_username",
      "any_name",
      "any_password",
      Profile.ADMIN
    );
    jest.spyOn(UsersRepository.prototype, "list").mockResolvedValueOnce([user]);
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce(undefined);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValueOnce("OK");
    const usecase = new ListUsersUsecase();
    const response = await usecase.execute();

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(1);
    expect(response.data).toEqual([user.toJSON()]);
  });

  it("should return status 200 when users in cache", async () => {
    const user = new User(
      "any_id",
      "any_username",
      "any_name",
      "any_password",
      Profile.ADMIN
    );
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce([user.toJSON()]);
    const usecase = new ListUsersUsecase();
    const response = await usecase.execute();

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(1);
    expect(response.data).toEqual([user.toJSON()]);
  });

  it("should return status 200 when send filters", async () => {
    const user = new User(
      "any_id",
      "any_username",
      "any_name",
      "any_password",
      Profile.ADMIN
    );
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce([user.toJSON()]);
    const usecase = new ListUsersUsecase();
    const response = await usecase.execute("ADMIN");

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(1);
    expect(response.data).toEqual([user.toJSON()]);
  });

  it("should return status 200 when send filters but profile not registred", async () => {
    const user = new User(
      "any_id",
      "any_username",
      "any_name",
      "any_password",
      Profile.ADMIN
    );
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce([user.toJSON()]);
    const usecase = new ListUsersUsecase();
    const response = await usecase.execute("CANDIDATE");

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(0);
  });
});
