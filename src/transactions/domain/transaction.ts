import { Category } from "@categories/domain/category";
import type { TransactionType } from "@transactions/domain/transactionType";
import { User } from "@users/domain/user";

export class Transaction {
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly user: User | null,
    readonly categoryId: number,
    readonly category: Category | null,
    readonly amount: number,
    readonly description: string,
    readonly type: TransactionType,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {}
}
