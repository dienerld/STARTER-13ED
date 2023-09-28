import { UsersRepository } from "@app/features/users/repository/users.repository";
import { LoginUserUsecase } from "@app/features/users/usecase/login.usecase";
import { User } from "@app/models/user.model";
import { Profile } from "@app/shared/enums";
import { bcrypt, jwt } from "@app/shared/utils";
import { DatabaseConnection } from "@main/database/typeorm.connection";

describe("[Usecase - User] - Login", () => {
  jest.mock(
    "@app/features/users/repository/users.repository"
  );

  beforeAll(async () => {
    await DatabaseConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
  });

  it("should return status 200 with access token", async () => {
    jest
      .spyOn(UsersRepository.prototype, "findByUsername")
      .mockResolvedValueOnce(
        new User(
          "any_id",
          "any_username",
          "any_name",
          "any_password",
          Profile.ADMIN
        )
      );
    jest.spyOn(bcrypt, "compareHash").mockResolvedValueOnce(true);
    jest.spyOn(jwt, "encoded").mockImplementationOnce((_) => "any_jwtToken");
    const usecase = new LoginUserUsecase();
    const response = await usecase.execute({
      username: "any_name",
      password: "any_password",
    });

    expect(response.code).toBe(200);
    expect(response.data.token).toBe("any_jwtToken");
  });

  it("should return status 404 when user not found", async () => {
    jest
      .spyOn(UsersRepository.prototype, "findByUsername")
      .mockResolvedValueOnce(null);

    const usecase = new LoginUserUsecase();
    const response = await usecase.execute({
      username: "invalid_name",
      password: "any_password",
    });

    expect(response.code).toBe(404);
    expect(response.message).toBe("User not found.");
  });

  it("should return status 404 when password is invalid", async () => {
    jest
      .spyOn(UsersRepository.prototype, "findByUsername")
      .mockResolvedValueOnce(
        new User(
          "any_id",
          "any_username",
          "any_name",
          "any_password",
          Profile.ADMIN
        )
      );
    jest.spyOn(bcrypt, "compareHash").mockResolvedValueOnce(false);
    const usecase = new LoginUserUsecase();
    const response = await usecase.execute({
      username: "any_name",
      password: "invalid_password",
    });

    expect(response.code).toBe(404);
    expect(response.message).toBe("Username or password invalid.");
  });
});
