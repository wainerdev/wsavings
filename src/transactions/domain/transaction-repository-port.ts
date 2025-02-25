import { Transaction } from "@transactions/domain/transaction";

export interface TransactionRepositoryPort {
  create(transaction: Transaction): Promise<Transaction>;
  findByUserId(userId: string): Promise<Transaction[]>;
  findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]>;
}
