import { User } from "@users/domain/user";

export class UserSignInDtoMapper {
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
  static toDomain(email: string): User {
    return new User(
      null as unknown as number,
      email,
      null as unknown as string,
      null as unknown as number,
      null as unknown as string,
      null as unknown as Date,
      null as unknown as Date
    );
  }
}
