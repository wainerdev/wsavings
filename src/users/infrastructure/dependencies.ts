import { ecryptService, logger } from "@shared/infrastructure/dependencies";
import { UserService } from "@users/application/user-service";
import { UserRepository } from "@users/infrastructure/database/postgresql/adapter/pg-user-repository";
import { UserController } from "@users/infrastructure/rest-api/user-controller";

const userRepository = new UserRepository();
const userService = new UserService(userRepository, logger);

export const transactionController = new UserController(
  userService,
  ecryptService
);
