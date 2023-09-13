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
		this.id = id;
		this.#description = description;
		this.#company = company;
		this.#limitDate = limitDate;
		this.#isOpen = isOpen;
		this.#idRecruiter = idRecruiter;
		this.#maxCandidates = maxCandidates;
	}

	public toJSON() {
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
