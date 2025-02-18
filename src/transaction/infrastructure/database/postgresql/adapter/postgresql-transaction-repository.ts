import { Transaction } from "../../../../domain/transaction";
import { TransactionRepository } from "../../../../domain/transaction-repository";
import { PgTransaction } from "../../../../../shared/infrastructure/databases/postgresql/models/PgTransaction";
import { TransactionDtoMapper } from "../../../mapper/TransactionDtoMapper";

export class PostgresqlTransactionRepository implements TransactionRepository {
  async save(transaction: Transaction): Promise<void> {

    const mappedTransaction = TransactionDtoMapper.toDto(transaction);

    await PgTransaction.create({
      amount: mappedTransaction.amount,
      description: mappedTransaction.description,
      type: mappedTransaction.type,
      user: '',
    });
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await PgTransaction.findAll({});

    return transactions.map((transaction) => {
      return TransactionDtoMapper.toDomain(
        transaction.id,
        "",
        transaction.amount,
        transaction.description,
        transaction.type,
        new Date(),
        new Date()
      );
    });
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    const transactions = await PgTransaction.findAll({});
    
    return transactions.map((transaction) => {
      return TransactionDtoMapper.toDomain(
        transaction.id,
        "",
        transaction.amount,
        transaction.description,
        transaction.type,
        new Date(),
        new Date()
      );
    });
  }
}
