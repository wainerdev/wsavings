import { UserRepository } from "../../../../domain/user-repository";
import { UserDtoMapper } from "../../../mapper/UserDtoMapper";
import { User } from "../../../../domain/user";
import { PgUser } from "../../../../../shared/infrastructure/databases/postgresql/models/PgUser";

export class PgUserRepository implements UserRepository {
  async save(user: User): Promise<void> {

    const mappedTransaction = UserDtoMapper.toDto(user);
    
    await PgUser.create({
      email: mappedTransaction.email,
      password: mappedTransaction.password,
      fullName: mappedTransaction.fullName,
    });
  }

  async findByUserId(userId: string): Promise<User[]> {
    const users = await PgUser.findAll({ where: { id: userId } });
    console.log('users', users);

    return users.map((user) => {
      return UserDtoMapper.toDomain(
        user.id,
        user.email,
        user.fullName,
        user.password,
        user.createdAt,
        user.updatedAt 
      );
    });
  }
}
