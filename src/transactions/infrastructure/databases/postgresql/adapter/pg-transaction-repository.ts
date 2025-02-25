import { PgTransaction } from "@shared/infrastructure/databases/postgresql/models/PgTransaction";
import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { Transaction } from "@transactions/domain/transaction";
import { TransactionRepositoryPort } from "@transactions/domain/transaction-repository-port";
import { TransactionDtaMapper } from "@transactions/infrastructure/databases/postgresql/mappers/transaction-dta";

export class TransactionRepository implements TransactionRepositoryPort {
  async create(transaction: Transaction): Promise<Transaction> {
    const mappedTransaction = TransactionDtaMapper.toEntity(transaction);

    const createdTransaction = await PgTransaction.create(mappedTransaction);

    return TransactionDtaMapper.toDomain(createdTransaction);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await PgTransaction.findAll({
      where: { userId },
      include: {
        model: PgUser,
        as: "users",
      },
    });

    return transactions.map(TransactionDtaMapper.toDomain);
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    const transactions = await PgTransaction.findAll({
      where: { userId, createdAt: { $gte: startDate, $lte: endDate } },
      include: {
        model: PgUser,
        as: "users",
      },
    });

    return transactions.map(TransactionDtaMapper.toDomain);
  }
}
