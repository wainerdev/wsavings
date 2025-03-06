import { User } from "@users/domain/user";

export interface UserRepositoryPort {
  singUp(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  profile(userId: number): Promise<User>;
}
