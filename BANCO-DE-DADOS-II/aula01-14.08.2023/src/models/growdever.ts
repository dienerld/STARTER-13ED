import crypto from 'crypto';

type GrowdeverStatus = 'STUDYING' | 'GRADUATED' | 'CANCELED';

export type GrowdeverJSON = {
	id: string;
	name: string;
	birth: Date;
	cpf: string;
	status: GrowdeverStatus;
	skills: string[];
};

export class Growdever {
	private _id: string;
	private _name: string;
	private _birth: Date;
	private _cpf: string;
	private _status: GrowdeverStatus;
	private _skills: string[];

	constructor(name: string, birth: string, cpf: string, skills?: string[]) {
		this._id = crypto.randomUUID();
		this._name = name;
		this._birth = new Date(birth);
		this._cpf = cpf.replace(/\W/g, '');
		this._status = 'STUDYING';
		this._skills = skills ?? [];
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get birth(): Date {
		return this._birth;
	}

	get cpf(): string {
		return this._cpf;
	}

	get status(): string {
		return this._status;
	}

	get skills(): string[] {
		return [...this._skills];
	}

	updateInformation(name: string, birth: Date, status: GrowdeverStatus) {
		if (!name) throw new Error('Nome inválido');

		if (!birth || isNaN(birth.getDate()))
			throw new Error('Data de nascimento inválido');

		if (!['STUDYING', 'GRADUATED', 'CANCELED'].some((s) => s === status)) {
			throw new Error(
				'Status inválido. Valores permitidos: STUDYING, GRADUATED ou CANCELED'
			);
		}

		this._name = name;
		this._birth = birth;
		this._status = status;
	}

	updateSkills(newSkills: string[]) {
		if (!newSkills || newSkills.length === 0) {
			throw new Error('Não é possivel adicionar uma lista vazia.');
		}

		this._skills.push(...newSkills);
	}

	toJson(): GrowdeverJSON {
		return {
			id: this._id,
			name: this._name,
			birth: this._birth,
			cpf: this._cpf,
			status: this._status,
			skills: this._skills,
		};
	}

	deleteSkill(skill: string) {
		if (!skill) {
			throw new Error('Skill informada está inválida');
		}

		const indexSkill = this._skills.findIndex(
			(s) => s.toLowerCase() === skill.toLowerCase()
		);

		if (indexSkill < 0) {
			throw new Error('Skill não encontrada');
		}

		this._skills.splice(indexSkill, 1);
	}
}
