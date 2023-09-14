import { Profile } from '../shared/enums';
import { BaseModel } from './base.model';

export interface UserJSON {
	id: string;
	username: string;
	profile: Profile;
	company?: string;
	createdAt: Date;
}

export class User extends BaseModel {
	#username: string;
	#name: string;
	#password: string;
	#profile: Profile;
	#company?: string;

	constructor(id: string, username: string, name: string, password: string, profile: Profile, company?: string) {
		super();
		this.id = id;
		this.#username = username;
		this.#name = name;
		this.#password = password;
		this.#profile = profile;
		this.#company = company;
	}

	public toJSON(): UserJSON {
		return {
			id: this.id,
			username: this.#username,
			profile: this.#profile,
			company: this.#company,
			createdAt: this.createdAt,
		};
	}

	public toJSONWithPassword() {
		return {
			id: this.id,
			username: this.#username,
			profile: this.#profile,
			company: this.#company,
			password: this.#password,
			createdAt: this.createdAt,
		};
	}
}
