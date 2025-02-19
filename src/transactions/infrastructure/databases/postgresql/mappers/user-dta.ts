import { UserRow, PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { User } from "@users/domain/user";

export class UserDtaMapper {
  static toEntity(
    user: User 
  ): UserRow {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      fullName: user.fullName,
    };
  }

  static toDomain(user: PgUser): User {
    return new User(
      user.id,
      user.email,
      user.fullName,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }
}

