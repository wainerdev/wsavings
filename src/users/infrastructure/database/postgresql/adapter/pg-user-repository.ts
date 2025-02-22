import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { User } from "@users/domain/user";
import { UserRepository } from "@users/domain/user-repository-port";
import { UserDtaMapper } from "@users/infrastructure/mapper/user-dta";

export class PgUserRepository implements UserRepository {
  async singUp(user: User): Promise<void> {
    const mappedUser = UserDtaMapper.toDto(user);

    await PgUser.create(mappedUser);
  }

  async singIn(user: User): Promise<User | null> {
    const userFound = await PgUser.findOne({
      where: { email: user.email, password: user.password },
    });

    if (!userFound) {
      return null;
    }

    return UserDtaMapper.toDomain(userFound);
  }
}
