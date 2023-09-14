export interface CreateJobDTO {
	idRecruiter: string;
	description: string;
	companyName: string;
	isOpen: boolean;
	limitDate: Date;
	maxCandidate?: number;
}
