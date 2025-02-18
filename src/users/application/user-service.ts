import { Logger } from "../../shared/domain/logger";
import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async save(user: User): Promise<void> {
    this.logger.info(
      `[User Service] - Saving transaction for user: ${user.id}.`
    );

    await this.userRepository.save(user);

    this.logger.info("[User Service] - Transaction saved successfully");
  }

  async findByUserId(userId: string): Promise<User[]> {
    this.logger.info(
      `[User Service] - Getting transactions for user: ${userId}`
    );

    const users = await this.userRepository.findByUserId(userId);

    this.logger.info(
      `[User Service] - Found ${users.length} transactions for user: ${userId}`
    );

    return users;
  }
}
