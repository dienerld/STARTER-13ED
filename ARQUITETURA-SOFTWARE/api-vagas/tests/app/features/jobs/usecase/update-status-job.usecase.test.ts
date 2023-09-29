import { UpdateStatusJob } from "@app/features/jobs/usecase";
import { Profile } from "@app/shared/enums";
import { RedisConnection } from "@main/database/ioredis.connection";
import { DatabaseConnection } from "@main/database/typeorm.connection";
import {
  JobEntityBuilder,
  UserEntityBuilder,
} from "@tests/app/shared/builders/entities";

describe("[Int - Usecase - Jobs] - Update", () => {
  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterEach(async () => {
    await DatabaseConnection.connection.query(
      "TRUNCATE candidates_jobs, jobs, users;"
    );
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
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
});
