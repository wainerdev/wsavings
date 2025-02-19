import { Logger } from "@shared/domain/logger";
import { Transaction } from "@transactions/domain/transaction";
import { TransactionRepositoryPort } from "@transactions/domain/transaction-repository";

export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepositoryPort,
    private readonly logger: Logger
  ) {}

  async saveTransaction(transaction: Transaction): Promise<void> {
    this.logger.info(
      `[Transaction Service] - Saving transaction for user: ${transaction.id} with amount: ${transaction.amount}`
    );

    this.logger.info("[Transaction Service] - Transaction saved successfully");

    await this.transactionRepository.save(transaction);
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    this.logger.info(
      `[Transaction Service] - Getting transactions for user: ${userId}`
    );

    const transactions = await this.transactionRepository.findByUserId(userId);

    this.logger.info(
      `[Transaction Service] - Found ${transactions.length} transactions for user: ${userId}`
    );

    return transactions;
  }

  async getTransactionsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    this.logger.info(
      `[Transaction Service] - Getting transactions for user: ${userId} between dates: ${startDate} and ${endDate}`
    );

    const transactions = await this.transactionRepository.findByDateRange(
      userId,
      startDate,
      endDate
    );

    this.logger.info(
      `[Transaction Service] - Found ${transactions.length} transactions for user: ${userId} between dates: ${startDate} and ${endDate}`
    );

    return transactions;
  }
}
