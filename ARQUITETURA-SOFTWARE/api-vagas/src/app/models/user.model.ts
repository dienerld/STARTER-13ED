import { Profile } from '../shared/enums';
import { BaseModel } from './base.model';

export interface UserJSON {
  id: string;
  username: string;
  name: string;
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

  constructor(
    id: string,
    username: string,
    name: string,
    password: string,
    profile: Profile,
    company?: string
  ) {
    super();
    this.id = id;
    this.#username = username;
    this.#name = name;
    this.#password = password;
    this.#profile = profile;
    this.#company = company;
    this.createdAt = new Date();
  }

  public toJSON(): UserJSON {
    return {
      id: this.id,
      name: this.#name,
      username: this.#username,
      profile: this.#profile,
      company: this.#company,
      createdAt: this.createdAt,
    };
  }

  public toJSONWithPassword() {
    return {
      ...this.toJSON(),
      password: this.#password,
    };
  }
}
