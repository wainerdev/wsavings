import { User } from "./user";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByUserId(userId: string): Promise<User[]>;
}
