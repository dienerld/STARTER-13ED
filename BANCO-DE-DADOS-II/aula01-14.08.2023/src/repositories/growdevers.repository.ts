import { growdeversDB } from '../db/growdevers';
import { Growdever, GrowdeverJSON } from '../models';
import { CreateGrowdeverDTO } from '../usecases/create-growdever.usecase';

export class GrowdeverRepository {
	public verifyCpfExists(cpf: string): boolean {
		return growdeversDB.some(
			(growdever) => growdever.cpf === cpf.replace(/\W/g, '')
		);
	}

	public saveGrowdever(growdeverData: CreateGrowdeverDTO): Growdever {
		const { name, birth, cpf, skills } = growdeverData;
		const newGrowdever = new Growdever(name, birth, cpf, skills);

		growdeversDB.push(newGrowdever);

		return newGrowdever;
	}

	public getGrowdevers(): GrowdeverJSON[] {
		return growdeversDB.map((g) => g.toJson());
	}
}
