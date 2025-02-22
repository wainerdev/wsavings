import { User } from "./user";

export interface UserRepository {
  singUp(user: User): Promise<void>;
  singIn(user: User): Promise<User | null>;
}
