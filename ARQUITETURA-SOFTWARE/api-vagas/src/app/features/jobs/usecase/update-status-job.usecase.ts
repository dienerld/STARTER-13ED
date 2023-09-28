import { Result, ResultDTO } from "@app/shared/utils/result.helper";

export class UpdateStatusJob {
  async execute(): Promise<ResultDTO> {
    return Result.success(200, "status updated", undefined);
  }
}
