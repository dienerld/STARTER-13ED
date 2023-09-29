import { UpdateStatusJob } from "@app/features/jobs/usecase";
import { Profile } from "@app/shared/enums";
import { RedisConnection } from "@main/database/ioredis.connection";
import { DatabaseConnection } from "@main/database/typeorm.connection";
import {
  JobEntityBuilder,
  UserEntityBuilder,
} from "@tests/app/shared/builders/entities";
import { randomUUID } from "crypto";

describe("[Int - Usecase - Jobs] - Update", () => {

  afterEach(async () => {
    await DatabaseConnection.connection.query(
      "TRUNCATE candidates_jobs, jobs, users;"
    );
  });

  it("should return 200 when update isOpen to false successfully ", async () => {
    const usecase = new UpdateStatusJob();
    const recruiter = await UserEntityBuilder.init(Profile.RECRUITER).build();
    const job = await JobEntityBuilder.init(recruiter).build();

    const response = await usecase.execute(job.id, false);

    expect(response.code).toBe(200);
    expect(response.data.isOpen).toBe(false);
  });

  it("should return 200 when update isOpen to true successfully ", async () => {
    const usecase = new UpdateStatusJob();
    const recruiter = await UserEntityBuilder.init(Profile.RECRUITER).build();
    const job = await JobEntityBuilder.init(recruiter).build();

    const response = await usecase.execute(job.id, true);

    expect(response.code).toBe(200);
    expect(response.data.isOpen).toBe(true);
  });

  it('should return 404 when job not found', async () => {
    const usecase = new UpdateStatusJob();
    const response = await usecase.execute(randomUUID(), true);

    expect(response.code).toBe(404);
    expect(response.message).toBe('Job not found');
  });

  it('should return 500 when unexpected error', async () => {
    const usecase = new UpdateStatusJob();
    const response = await usecase.execute('invalid_id', true);

    expect(response.code).toBe(500);
    expect(response.message).toBe('invalid input syntax for type uuid: \"invalid_id\"');
  });

  it('should return 400 when invalid new status', async () => {
    const usecase = new UpdateStatusJob();
    const recruiter = await UserEntityBuilder.init(Profile.RECRUITER).build();
    const job = await JobEntityBuilder.init(recruiter).build();

    const response = await usecase.execute(job.id, undefined as unknown as boolean);

    expect(response.code).toBe(400);
    expect(response.message).toBe('Missing status');
  })
});
