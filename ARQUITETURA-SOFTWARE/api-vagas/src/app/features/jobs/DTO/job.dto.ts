export interface JobDTO {
  id: string;
  description: string;
  isOpen: boolean;
  limitDate: Date;
  idRecruiter: string;
  company: string;
  maxCandidates?: number;
}
