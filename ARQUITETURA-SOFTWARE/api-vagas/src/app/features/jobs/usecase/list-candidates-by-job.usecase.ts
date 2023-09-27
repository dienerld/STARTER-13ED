import { UserJSON } from '../../../models/user.model';
import { CacheRepository } from '../../../shared/cache/cache.repository';
import { Result, ResultDTO } from '../../../shared/utils/result.helper';
import { JobsRepository } from '../repository';

const PREFIX_CACHE = 'list-candidates';

export class ListCandidatesByJobUsecase {
  async execute(jobId: string, userId: string): Promise<ResultDTO> {
    const repository = new JobsRepository();
    const cacheRepository = new CacheRepository();

    let candidates = await cacheRepository.get<UserJSON[]>(
      `${PREFIX_CACHE}-${userId}-${jobId}`
    );

    if (!candidates) {
      const candidatesDB = await repository.listCandidatesByJob(jobId, userId);
      if (!candidatesDB) {
        return Result.error(400, 'Job not found');
      }
      candidates = candidatesDB.map((u) => u.toJSON());

      await cacheRepository.set(
        `${PREFIX_CACHE}-${userId}-${jobId}`,
        candidates
      );
    }

    return Result.success(200, 'Candidates found', candidates);
  }
}
