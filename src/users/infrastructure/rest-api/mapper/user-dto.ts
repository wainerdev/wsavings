import { User } from "@users/domain/user";

export class UserDtoMapper {
  static toDto(user: User): unknown {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  static toDomain(
    id: number,
    email: string,
    fullName: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ): User {
    return new User(id, email, fullName, password, createdAt, updatedAt);
  }
}
