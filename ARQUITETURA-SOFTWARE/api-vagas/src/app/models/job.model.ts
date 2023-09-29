import { CreateJobDTO, JobDTO } from "@app/features/jobs/DTO";
import { BaseModel } from "./base.model";

export class Job extends BaseModel {
  #description: string;
  #company: string;
  #limitDate: Date;
  #isOpen: boolean;
  #idRecruiter: string;
  #maxCandidates?: number;

  constructor(
    id: string,
    description: string,
    company: string,
    limitDate: Date,
    isOpen: boolean,
    idRecruiter: string,
    maxCandidates?: number
  ) {
    super();
    this._id = id;
    this.#description = description;
    this.#company = company;
    this.#limitDate = limitDate;
    this.#isOpen = isOpen;
    this.#idRecruiter = idRecruiter;
    this.#maxCandidates = maxCandidates;
  }


  update(data: Partial<CreateJobDTO>) {
    if (data.isOpen !== undefined) {
      this.#isOpen = data.isOpen;
    }
  }

  public toJSON(): JobDTO {
    return {
      id: this.id,
      description: this.#description,
      company: this.#company,
      limitDate: this.#limitDate,
      isOpen: this.#isOpen,
      idRecruiter: this.#idRecruiter,
      maxCandidates: this.#maxCandidates,
    };
  }
}
