import { JobsRepository } from "@app/features/jobs/repository";
import { Job } from "@app/models/job.model";
import { User } from "@app/models/user.model";

export class JobEntityBuilder {
  #id: string = "any_id";
  #description = "any_description";
  #limitDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // data atual mais 5 dias
  #isOpen = true;
  #company: string;
  #idRecruiter: string;
  #maxCandidates?: number;

  private constructor(private repository = new JobsRepository()) {}

  static init(recruiter: User): JobEntityBuilder {
    const build = new JobEntityBuilder();
    build.#idRecruiter = recruiter.id;
    build.#company = recruiter.toJSON().company!;
    return build;
  }

  withMaxCandidates(maxCandidates: number): JobEntityBuilder {
    this.#maxCandidates = maxCandidates;
    return this;
  }

  async build(): Promise<Job> {
    return this.repository.save({
      description: this.#description,
      limitDate: this.#limitDate,
      isOpen: this.#isOpen,
      idRecruiter: this.#idRecruiter,
      companyName: this.#company,
      maxCandidate: this.#maxCandidates,
    });
  }
}
