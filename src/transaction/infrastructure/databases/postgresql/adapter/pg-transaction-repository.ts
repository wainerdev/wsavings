import { Transaction } from "../../../../domain/transaction";
import { TransactionRepositoryPort } from "../../../../domain/transaction-repository";
import { PgTransaction } from "../../../../../shared/infrastructure/databases/postgresql/models/PgTransaction";
import { PgUser } from "../../../../../shared/infrastructure/databases/postgresql/models/PgUser";
import { TransactionDtaMapper } from "../mappers/transaction-dta";

export class TransactionRepository implements TransactionRepositoryPort {
  async save(transaction: Transaction): Promise<void> {
    const mappedTransaction = TransactionDtaMapper.toEntity(transaction);

    await PgTransaction.create(mappedTransaction);
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
