import { Profile } from "@app/shared/enums";
import { jwt } from "@app/shared/utils";
import { createServer } from "@main/config/express.config";
import { DatabaseConnection } from "@main/database/typeorm.connection";
import { runServer } from "@main/server/express.server";
import { JobEntityBuilder, UserEntityBuilder } from "@tests/app/shared/builders/entities";
import supertest from "supertest";

describe('[e2e - Usecase - Jobs] - Update', () => {
  let app: Express.Application;

  beforeAll(() => {
    app = runServer();
  })

  afterEach(async () => {
    await DatabaseConnection.connection.query(
      "TRUNCATE candidates_jobs, jobs, users;"
    );
  });

  it("should return http 200 route root", async () => {
    const response = await supertest(app).get("/").send();

    expect(response.statusCode).toBe(200);
  })

  it("should return http 200 ok", async () => {
    const recruiter = await UserEntityBuilder.init(Profile.RECRUITER).build();
    const job = await JobEntityBuilder.init(recruiter).build();

    const token = jwt.encoded(recruiter.toJSON());

    const response = await supertest(app)
    .put(`/jobs/${job.id}`)
    .set("token", `${token}`).send({
      isOpen: false,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty("isOpen", false);
  });
});
