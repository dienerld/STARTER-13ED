import { Job } from "@app/models/job.model";

export class JobBuilder {
  #id: string = "any_id";
  #description = "any_description";
  #company = "any_companyName";
  #limitDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // data atual mais 5 dias
  #isOpen = true;
  #idRecruiter: string;
  #maxCandidates?: number;

  private constructor() {}

  static init(idRecruiter: string): JobBuilder {
    const build = new JobBuilder();
    build.#idRecruiter = idRecruiter;
    return build;
  }

  withMaxCandidates(maxCandidates: number): JobBuilder {
    this.#maxCandidates = maxCandidates;
    return this;
  }

  build(): Job {
    return new Job(
      this.#id,
      this.#description,
      this.#company,
      this.#limitDate,
      this.#isOpen,
      this.#idRecruiter,
      this.#maxCandidates
    );
  }
}
