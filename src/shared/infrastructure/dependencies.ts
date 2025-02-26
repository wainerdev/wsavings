import { EcryptService } from "@shared/infrastructure/auth/ecrypt";
import { MiddlewareService } from "@shared/infrastructure/auth/middleware";
import { FakeEmailSender } from "@shared/infrastructure/email-sender/fake-email-sender";
import { ConsoleLogger } from "@shared/infrastructure/logger/console-logger";
import { UserService } from "@users/application/user-service";
import { UserRepository } from "@users/infrastructure/database/postgresql/adapter/pg-user-repository";

export const logger = new ConsoleLogger();
export const emailSender = new FakeEmailSender(logger);
export const ecryptService = new EcryptService();

const userRepository = new UserRepository();
const userService = new UserService(userRepository, logger);
export const middleware = new MiddlewareService(
  userService,
  logger,
  ecryptService
);
