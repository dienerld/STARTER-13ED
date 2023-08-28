import { GrowdeverJSON } from '../models';
import { GrowdeverRepository } from '../repositories';

interface ResultList {
	success: boolean;
	message: string;
	data?: GrowdeverJSON[];
}

export class ListGrowdever {
	public execute(): ResultList {
		const repository = new GrowdeverRepository();

		const growdevers = repository.getGrowdevers();

		return {
			success: true,
			message: 'Growdever cadastrado',
			data: growdevers,
		};
	}
}
