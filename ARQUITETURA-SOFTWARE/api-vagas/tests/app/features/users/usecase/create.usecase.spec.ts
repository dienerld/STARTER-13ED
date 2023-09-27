import { CreateUserDTO } from '@app/features/users/DTO';
import { UsersRepository } from '@app/features/users/repository/users.repository';
import { CreateUserUsecase } from '@app/features/users/usecase/create.usecase';
import { User } from '@app/models/user.model';
import { Profile } from '@app/shared/enums';
import { jwt } from '@app/shared/utils';
import { DatabaseConnection } from '@main/database/typeorm.connection';

const makeSut = () => {
  const usecase = new CreateUserUsecase();

  const dto: CreateUserDTO = {
    name: 'any_name',
    password: 'any_password',
    profile: Profile.ADMIN,
    username: 'any_username',
    company: 'any_company',
  };

  return {
    usecase,
    dto,
  };
};

describe('[Usecase - User] - Create', () => {
  jest.mock(
    '../../../../../src/app/features/users/repository/users.repository'
  );

  beforeAll(async () => {
    await DatabaseConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
  });

  it('should return status 200 with user created', async () => {
    const { dto, usecase } = makeSut();
    jest
      .spyOn(UsersRepository.prototype, 'findByUsername')
      .mockResolvedValueOnce(null);
    jest
      .spyOn(UsersRepository.prototype, 'save')
      .mockImplementationOnce(async (userDto) => {
        return new User(
          'uuid',
          userDto.username,
          userDto.name,
          userDto.password,
          userDto.profile,
          userDto.company
        );
      });

    const response = await usecase.execute(dto);

    expect(response.code).toBe(200);
    expect(response.data).toHaveProperty('id', 'uuid');
    expect(response.data).toHaveProperty('company', 'any_company');
  });

  it('should return status 200 with user created without company', async () => {
    const { dto, usecase } = makeSut();
    jest
      .spyOn(UsersRepository.prototype, 'findByUsername')
      .mockResolvedValueOnce(null);
    jest
      .spyOn(UsersRepository.prototype, 'save')
      .mockImplementationOnce(async (userDto) => {
        return new User(
          'uuid',
          userDto.username,
          userDto.name,
          userDto.password,
          userDto.profile,
          userDto.company
        );
      });
    dto.company = undefined;
    const response = await usecase.execute(dto);

    expect(response.code).toBe(200);
    expect(response.data).toHaveProperty('id', 'uuid');
    expect(response.data.company).toBeUndefined();
  });

  it('should return status 400 when send user already exist', async () => {
    const { dto, usecase } = makeSut();

    jest
      .spyOn(UsersRepository.prototype, 'findByUsername')
      .mockResolvedValueOnce({} as User);

    const response = await usecase.execute(dto);

    jest.spyOn(jwt, 'encoded').mockImplementationOnce((input) => '');

    expect(response.code).toBe(400);
    expect(response.message).toBe('User already exists');
  });
});
