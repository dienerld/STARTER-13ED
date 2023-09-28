import { ListCandidatesByJobUsecase } from "@app/features/jobs/usecase";
import { DatabaseConnection } from "@main/database/typeorm.connection";
import { RedisConnection } from "@main/database/ioredis.connection";
import { CacheRepository } from "@app/shared/cache/cache.repository";
import { JobsRepository } from "@app/features/jobs/repository";
import { User } from "@app/models/user.model";
import { Profile } from "@app/shared/enums";

function makeSut() {
  const usecase = new ListCandidatesByJobUsecase();
  const mockUser = new User(
    "any_uid",
    "any_username",
    "any_name",
    "any_password",
    Profile.CANDIDATE
  );

  return {
    usecase,
    mockUser,
  };
}

describe("[Usecase - Jobs] - List", () => {
  jest.mock("@app/features/jobs/repository");
  jest.mock("ioredis", () => require("ioredis-mock"));

  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
  });

  it("should returns 200 with empty array candidates", async () => {
    const { usecase } = makeSut();

    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce(undefined);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValueOnce("OK");
    jest
      .spyOn(JobsRepository.prototype, "listCandidatesByJob")
      .mockResolvedValueOnce([]);

    const response = await usecase.execute("any_job_id", "any_user_id");

    expect(response.code).toBe(200);
    expect(response.data).toEqual([]);
  });

  it("should returns 200 with array candidates", async () => {
    const { mockUser, usecase } = makeSut();

    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce(undefined);
    jest.spyOn(CacheRepository.prototype, "set").mockResolvedValueOnce("OK");
    jest
      .spyOn(JobsRepository.prototype, "listCandidatesByJob")
      .mockResolvedValueOnce([mockUser]);

    const response = await usecase.execute("any_job_id", "any_user_id");

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(1);
    expect(response.data).toEqual([mockUser.toJSON()]);
  });

  it("should returns 200 with array candidates in cache", async () => {
    const { mockUser, usecase } = makeSut();

    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce([mockUser.toJSON()]);

    const response = await usecase.execute("any_job_id", "any_user_id");

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(1);
    expect(response.data).toEqual([mockUser.toJSON()]);
  });

  it("should return status 400 when not found job", async () => {
    const { usecase } = makeSut();

    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(JobsRepository.prototype, "listCandidatesByJob")
      .mockResolvedValueOnce(undefined);

    const response = await usecase.execute("invalid_job_id", "any_user_id");

    expect(response.code).toBe(400);
    expect(response.ok).toBeFalsy();
    expect(response.message).toBe("Job not found");
  });
});
