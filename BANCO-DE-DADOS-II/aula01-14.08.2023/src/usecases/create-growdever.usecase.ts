import { GrowdeverJSON } from '../models';
import { GrowdeverRepository } from '../repositories';

interface ResultCreate {
	success: boolean;
	message: string;
	data?: GrowdeverJSON;
}

export interface CreateGrowdeverDTO {
	name: string;
	birth: string;
	cpf: string;
	skills?: string[];
}

export class CreateGrowdever {
	public execute(data: CreateGrowdeverDTO): ResultCreate {
		const repository = new GrowdeverRepository();

		if (repository.verifyCpfExists(data.cpf)) {
			return {
				success: false,
				message: 'Existe um Growdever já cadastrado com esse CPF',
			};
		}

		const growdever = repository.saveGrowdever(data);

		return {
			success: true,
			message: 'Growdever cadastrado',
			data: growdever.toJson(),
		};
	}
}
