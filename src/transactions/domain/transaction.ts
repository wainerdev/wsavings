import { User } from "@users/domain/user";
import type { TransactionType } from "@transactions/domain/transactionType";

export class Transaction {
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly user: User | null,
    readonly amount: number,
    readonly description: string,
    readonly type: TransactionType,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {}
}