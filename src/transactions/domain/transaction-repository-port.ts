import { Transaction } from "@transactions/domain/transaction";

export interface TransactionRepositoryPort {
  create(transaction: Transaction): Promise<Transaction>;
  findByUserId(userId: number): Promise<Transaction[]>;
  findByDateRange(
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]>;
}
