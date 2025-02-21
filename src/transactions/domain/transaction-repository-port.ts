import { Transaction } from "@transactions/domain/transaction";

export interface TransactionRepositoryPort {
  save(transaction: Transaction): Promise<void>;
  findByUserId(userId: string): Promise<Transaction[]>;
  findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]>;
}
