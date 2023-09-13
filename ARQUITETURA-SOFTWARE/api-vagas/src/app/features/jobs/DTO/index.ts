export interface CreateJobDTO {
	description: string;
	companyName: string;
	limitDate: Date;
	isOpen: boolean;
	idRecruiter: string;
	maxCandidate: number;
}
