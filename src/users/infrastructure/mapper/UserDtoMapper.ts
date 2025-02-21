import { User } from "../../domain/user";

export class UserDtoMapper {
  static toDto(user: User) {
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
  ) {
    return new User(id, email, fullName, password, createdAt, updatedAt);
  }
}
