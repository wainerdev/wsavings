import { Logger } from "../../shared/domain/logger";
import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository-port";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async singIn(user: User): Promise<void> {
    this.logger.info(
      `[User Service] - User ${user.email} is trying to sign in.`
    );

    await this.userRepository.singIn(user);

    this.logger.info("[User Service] - User signed in successfully");
  }

  async singUp(user: User): Promise<void> {
    this.logger.info(
      `[User Service] - User ${user.email} is trying to sign up.`
    );

    await this.userRepository.singUp(user);

    this.logger.info("[User Service] - User signed up successfully");
  }
}
