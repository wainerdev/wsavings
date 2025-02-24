import { User } from "./user";

export interface UserRepositoryPort {
  singUp(user: User): Promise<void>;
  singIn(user: User): Promise<User | null>;
}
