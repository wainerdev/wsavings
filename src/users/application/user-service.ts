import { Logger } from "@shared/domain/logger";
import { User } from "@users/domain/user";
import { UserRepositoryPort } from "@users/domain/user-repository-port";

export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly logger: Logger,
    private readonly serviceName: string
  ) {}
  async singUp(user: User): Promise<User> {
    this.logger.info(
      `${this.serviceName} - Signing user with email:${user.email}.`
    );

    const foundUser = await this.userRepository.singUp(user);

    this.logger.info(
      `${this.serviceName} - Signed user with email:${user.email} successfully.`
    );

    return foundUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.info(`${this.serviceName} - Finding user with email:${email}.`);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.logger.info(
        `${this.serviceName} - User with email ${email} not found.`
      );

      return null;
    }

    this.logger.info(`${this.serviceName} - User with email ${email} found.`);

    return user;
  }
}
