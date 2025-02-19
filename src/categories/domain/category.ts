import { User } from "@users/domain/user";

export class Category {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly userId: number,
    readonly user: User | null,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
