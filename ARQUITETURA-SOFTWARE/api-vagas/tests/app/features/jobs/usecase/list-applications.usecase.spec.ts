import { ListApplicationsUsecase } from "../../../../../src/app/features/jobs/usecase";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { RedisConnection } from "../../../../../src/main/database/ioredis.connection";
import { CacheRepository } from "../../../../../src/app/shared/cache/cache.repository";
import { CandidateJobsRepository } from "../../../../../src/app/features/jobs/repository";
import { CandidateJobEntity } from "../../../../../src/app/shared/entities";

describe("[Usecase - Jobs] - List", () => {
  jest.setTimeout(10000);
  jest.mock("../../../../../src/app/features/jobs/repository");
  jest.mock("ioredis", () => require("ioredis-mock"));

  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
  });

  it("should returns status 200 and empty array when without applications", async () => {
    const usecase = new ListApplicationsUsecase();

    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(undefined);
    jest
      .spyOn(CandidateJobsRepository.prototype, "listApplicationsByCandidate")
      .mockResolvedValue([]);

    const response = await usecase.execute("any_id");

    expect(response.code).toBe(200);
    expect(response.data).toEqual([]);
  });

  it("should returns status 200 and array with applications", async () => {
    const usecase = new ListApplicationsUsecase();

    const candidateJobEntity = new CandidateJobEntity();
    candidateJobEntity.candidateId = "any_id";
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(undefined);
    jest
      .spyOn(CandidateJobsRepository.prototype, "listApplicationsByCandidate")
      .mockResolvedValue([candidateJobEntity]);

    const response = await usecase.execute("any_id");

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(1);
    expect(response.data).toEqual([candidateJobEntity]);
  });

  it("should returns status 200 and array with applications in cache", async () => {
    const usecase = new ListApplicationsUsecase();

    const candidateJobEntity = new CandidateJobEntity();
    candidateJobEntity.candidateId = "any_id";
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValue([candidateJobEntity]);

    const response = await usecase.execute("any_id");

    expect(response.code).toBe(200);
    expect(response.data).toHaveLength(1);
    expect(response.data).toEqual([candidateJobEntity]);
  });
});
