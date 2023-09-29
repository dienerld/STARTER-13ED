import { UsersRepository } from "@app/features/users/repository/users.repository";
import { User } from "@app/models/user.model";
import {
  CandidateJobEntity,
  JobEntity,
  UserEntity,
} from "@app/shared/entities";
import { Profile } from "@app/shared/enums";

export class UserEntityBuilder {
  #name = "any_name";
  #username = "any_username";
  #profile: Profile;
  #password = "any_password";
  #company = "any_company";
  #jobs: JobEntity[] = [];
  #candidatesJob: CandidateJobEntity[] = [];

  private constructor(private repository = new UsersRepository()) {}

  static init(profile: Profile): UserEntityBuilder {
    const build = new UserEntityBuilder();
    build.#profile = profile;
    return build;
  }

  withName(name: string): UserEntityBuilder {
    this.#name = name;
    return this;
  }

  async build(): Promise<User> {
    return this.repository.save({
      name: this.#name,
      username: this.#username,
      profile: this.#profile,
      password: this.#password,
      company: this.#company,
    });
  }
}
