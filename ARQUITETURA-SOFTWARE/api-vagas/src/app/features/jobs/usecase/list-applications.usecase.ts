import { CacheRepository } from '../../../shared/cache/cache.repository';
import { Result } from '../../../shared/utils/result.helper';
import { CandidateJobsRepository } from '../repository';

const PREFIX_CACHE = 'list-applications';

export class ListApplications {
  async execute(userId: string) {
    const repository = new CandidateJobsRepository();
    const cacheRepository = new CacheRepository();
    let applications = await cacheRepository.get(`${PREFIX_CACHE}-${userId}`);

    if (!applications) {
      applications = await repository.listApplicationsByCandidate(userId);
      await cacheRepository.set(`${PREFIX_CACHE}-${userId}`, applications);
    }

    return Result.success(200, 'Applications OK', applications);
  }
}
