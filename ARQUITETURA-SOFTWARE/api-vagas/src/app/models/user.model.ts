import { Profile } from "../shared/enums";
import { BaseModel } from "./base.model";

export class User extends BaseModel {
	#username: string;
	#name: string;
	#password: string;
	#role: Profile;

	constructor(
		id: string,
		username: string,
		name: string,
		password: string,
		role: Profile
	) {
		super();
		this.id = id;
		this.#username = username;
		this.#name = name;
		this.#password = password;
		this.#role = role;
	}

	public toJSON() {
		return {
			id: this.id,
			username: this.#username,
			role: this.#role,
			createdAt: this.createdAt,
		};
	}

	public toJSONWithPassword() {
		return {
			id: this.id,
			username: this.#username,
			role: this.#role,
			password: this.#password,
			createdAt: this.createdAt,
		};
	}
}
