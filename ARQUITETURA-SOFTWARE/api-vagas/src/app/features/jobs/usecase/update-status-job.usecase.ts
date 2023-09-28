import { Result, ResultDTO } from "@app/shared/utils/result.helper";
import { JobsRepository } from "../repository";
import { CacheRepository } from "@app/shared/cache/cache.repository";

const PREFIX_CACHE = "list-jobs";
export class UpdateStatusJob {
  async execute(idJob: string, newStatus: boolean): Promise<ResultDTO> {
    try {
      const repository = new JobsRepository();
      const cacheRepository = new CacheRepository();

      const job = await repository.getJobByID(idJob);

      if (!job) {
        return Result.error(404, "Job not found");
      }

      job.update({ isOpen: newStatus });
      await repository.update(job.toJSON());
      await cacheRepository.delete(`${PREFIX_CACHE}`);

      return Result.success(200, "status updated", job?.toJSON());
    } catch (err: any) {
      return Result.error(500, err.message);
    }
  }
}
