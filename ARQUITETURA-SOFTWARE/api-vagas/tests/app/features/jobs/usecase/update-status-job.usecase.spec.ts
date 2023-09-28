import { UpdateStatusJob } from "@app/features/jobs/usecase";

describe("[Usecase - Jobs] - Update", () => {
  it("should return 200 when update successfully", async () => {
    const usecase = new UpdateStatusJob();

    const response = await usecase.execute();

    expect(response.code).toBe(200);
  });
});
