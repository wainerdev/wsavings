import { Logger } from "@shared/domain/logger";
import { Transaction } from "@transactions/domain/transaction";
import { TransactionRepositoryPort } from "@transactions/domain/transaction-repository-port";

export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepositoryPort,
    private readonly logger: Logger,
    private readonly serviceName = "[Transaction Service]"
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    this.logger.info(
      `[${this.serviceName}] - Creating transaction for user: ${transaction.userId}`
    );

    const createdTransaction = await this.transactionRepository.create(
      transaction
    );

    this.logger.info(
      `[${this.serviceName}] - Created transaction with id: ${createdTransaction.id}`
    );

    return transaction;
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    this.logger.info(
      `${this.serviceName} - Getting transactions for user: ${userId}`
    );

    const transactions = await this.transactionRepository.findByUserId(userId);

    this.logger.info(
      `${this.serviceName} - Found ${transactions.length} transactions for user: ${userId}`
    );

    return transactions;
  }

  async getTransactionsByDateRange(
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    this.logger.info(
      `[${this.serviceName}] - Getting transactions for user: ${userId} between dates: ${startDate} and ${endDate}`
    );

    const transactions = await this.transactionRepository.findByDateRange(
      userId,
      startDate,
      endDate
    );

    this.logger.info(
      `[${this.serviceName}] - Found ${transactions.length} transactions for user
      ${userId} between dates: ${startDate} and ${endDate}`
    );

    return transactions;
  }
}
