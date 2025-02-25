import { EcryptService } from "@shared/application/ecrypt-service";
import { logger } from "@shared/infrastructure/dependencies";
import { UserService } from "@users/application/user-service";
import { PgUserRepository } from "@users/infrastructure/database/postgresql/adapter/pg-user-repository";
import { UserController } from "@users/infrastructure/rest-api/user-controller";

const userRepository = new PgUserRepository();
const ecryptService = new EcryptService();
const userService = new UserService(userRepository, logger, "[User Service]");

export const transactionController = new UserController(
  userService,
  ecryptService
);
