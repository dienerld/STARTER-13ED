import { CreateJobDTO } from "@app/features/jobs/DTO";
import { JobsRepository } from "@app/features/jobs/repository";
import { CreateJobUsecase } from "@app/features/jobs/usecase";
import { Job } from "@app/models/job.model";
import { DatabaseConnection } from "@main/database/typeorm.connection";

const makeSut = () => {
  const usecase = new CreateJobUsecase();

  const dto: CreateJobDTO = {
    idRecruiter: "any_id",
    description: "any_description",
    companyName: "any_companyName",
    isOpen: true,
    limitDate: new Date(),
  };

  return {
    usecase,
    dto,
  };
};

describe("[Usecase - Jobs] - Create", () => {
  jest.mock("@app/features/jobs/repository/jobs.repository");

  beforeAll(async () => {
    await DatabaseConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
  });

  it("should return status 200 with job created", async () => {
    const { dto, usecase } = makeSut();
    jest
      .spyOn(JobsRepository.prototype, "save")
      .mockImplementationOnce(async (jobDto) => {
        return new Job(
          "any_id",
          jobDto.description,
          jobDto.companyName,
          jobDto.limitDate,
          jobDto.isOpen,
          jobDto.idRecruiter
        );
      });
    const response = await usecase.execute(dto);

    expect(response.code).toBe(200);
    expect(response.data).toHaveProperty("id", "any_id");
    expect(response.data).toHaveProperty("idRecruiter", dto.idRecruiter);
  });
});
