import { JobsRepository } from "@app/features/jobs/repository";
import { UpdateStatusJob } from "@app/features/jobs/usecase";
import { RedisConnection } from "@main/database/ioredis.connection";
import { DatabaseConnection } from "@main/database/typeorm.connection";
import { JobBuilder } from "@tests/app/shared/builders/models";

describe("[Usecase - Jobs] - Update", () => {
  jest.mock("@app/features/jobs/repository");

  it("should return 200 when update successfully", async () => {
    const usecase = new UpdateStatusJob();
    const job = JobBuilder.init("any_id_recruiter").build();

    jest
      .spyOn(JobsRepository.prototype, "getJobByID")
      .mockResolvedValueOnce(job);

    jest.spyOn(JobsRepository.prototype, "update").mockResolvedValueOnce();

    const response = await usecase.execute("any_id", false);

    expect(response.code).toBe(200);
    expect(response.data.isOpen).toBe(false);
  });

  it("should return 404 when job not found", async () => {
    const usecase = new UpdateStatusJob();

    jest
      .spyOn(JobsRepository.prototype, "getJobByID")
      .mockResolvedValueOnce(undefined);

    const response = await usecase.execute("incorrect_id", false);

    expect(response.code).toBe(404);
  });

  it("should returns 500 if unexpected error", async () => {
    const usecase = new UpdateStatusJob();

    jest
      .spyOn(JobsRepository.prototype, "getJobByID")
      .mockImplementationOnce(() => {
        throw new Error("Unexpected error");
      });

    const response = await usecase.execute("incorrect_id", false);

    expect(response.code).toBe(500);
    expect(response.message).toBe("Unexpected error");
  });

  it("should return 400 when missing new status", async () => {
    const usecase = new UpdateStatusJob();

    const response = await usecase.execute("any_id", undefined as unknown as boolean);

    expect(response.code).toBe(400);
    expect(response.message).toBe("Missing status");
  })
});
