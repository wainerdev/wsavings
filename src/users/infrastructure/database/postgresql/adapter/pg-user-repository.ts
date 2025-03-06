import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { User } from "@users/domain/user";
import { UserRepositoryPort } from "@users/domain/user-repository-port";
import { UserDtaMapper } from "@users/infrastructure/database/postgresql/mapper/user.dta";

export class UserRepository implements UserRepositoryPort {
  async singUp(user: User): Promise<User> {
    const mappedUser = UserDtaMapper.toDto(user);

    const createdUser = await PgUser.create(mappedUser);

    return UserDtaMapper.toDomain(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await PgUser.findOne({ where: { email } });

    if (!userFound) {
      return null;
    }

    return UserDtaMapper.toDomain(userFound);
  }

  async profile(userId: number): Promise<User> {
    const userFound = await PgUser.findByPk(userId);

    if (!userFound) {
      throw new Error("User not found");
    }

    return UserDtaMapper.toDomain(userFound);
  }
}
