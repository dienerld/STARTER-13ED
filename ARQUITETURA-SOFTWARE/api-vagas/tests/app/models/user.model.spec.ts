import { User } from '../../../src/app/models/user.model';
import { Profile } from '../../../src/app/shared/enums';

describe('[Model] - User', () => {
  it('should create a new user', () => {
    const user = new User(
      'any_id',
      'any_username',
      'any_name',
      'any_password',
      Profile.ADMIN
    );

    expect(user.toJSON()).toStrictEqual({
      id: 'any_id',
      name: 'any_name',
      username: 'any_username',
      profile: Profile.ADMIN,
      company: undefined,
      createdAt: expect.any(Date),
    });
  });

  it('should create a new user with company', () => {
    const user = new User(
      'any_id',
      'any_username',
      'any_name',
      'any_password',
      Profile.ADMIN,
      'any_company'
    );

    expect(user.toJSON()).toHaveProperty('company', 'any_company');
  });

  it('should return user with password', () => {
    const user = new User(
      'any_id',
      'any_username',
      'any_name',
      'any_password',
      Profile.ADMIN,
      'any_company'
    );

    expect(user.toJSONWithPassword()).toHaveProperty(
      'password',
      'any_password'
    );
  });
});
