import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { User } from "@users/domain/user";
import { UserRepositoryPort } from "@users/domain/user-repository-port";
import { UserDtaMapper } from "@users/infrastructure/mapper/user-dta";

export class PgUserRepository implements UserRepositoryPort {
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
}
