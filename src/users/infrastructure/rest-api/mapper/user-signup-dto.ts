import { User } from "@users/domain/user";

export class UserSignUpDtoMapper {
  static toDto(user: User): unknown {
    return {
      id: user.id,
      fullName: user.fullName,
      balance: user.balance,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  static toDomain(email: string, fullName: string, password: string): User {
    return new User(
      null as unknown as number,
      email,
      fullName,
      null as unknown as number,
      password,
      null as unknown as Date,
      null as unknown as Date
    );
  }
}
