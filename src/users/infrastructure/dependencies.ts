import { logger } from "../../shared/infrastructure/dependencies";
import { UserService } from "../application/user-service";
import { PgUserRepository } from "./database/postgresql/adapter/pg-user-repository";
import { UserController } from "./rest-api/user-controller";

const userRepository = new PgUserRepository();
const userService = new UserService(
  userRepository,
  logger
);

export const transactionController = new UserController(userService);
