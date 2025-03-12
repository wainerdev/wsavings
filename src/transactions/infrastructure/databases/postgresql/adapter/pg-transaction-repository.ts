import { PgCategory } from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { PgTransaction } from "@shared/infrastructure/databases/postgresql/models/PgTransaction";
import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { sequelize } from "@shared/infrastructure/databases/postgresql/sequelize";
import { Transaction } from "@transactions/domain/transaction";
import { TransactionRepositoryPort } from "@transactions/domain/transaction-repository-port";
import { TransactionDtaMapper } from "@transactions/infrastructure/databases/postgresql/mappers/transaction-dta";

export class TransactionRepository implements TransactionRepositoryPort {
  async create(transaction: Transaction): Promise<Transaction | null> {
    const t = await sequelize.transaction();
    try {
      const mappedTransaction = TransactionDtaMapper.toEntity(transaction);

      const createdTransaction = await PgTransaction.create(mappedTransaction, {
        transaction: t,
      });

      const currentUser = await PgUser.findByPk(transaction.userId, {
        transaction: t,
      });

      if (!currentUser) {
        t.rollback();
        throw new Error("User not found");
      }

      const balance =
        transaction.type === "INCOME"
          ? currentUser.balance + transaction.amount
          : currentUser.balance - transaction.amount;

      await PgUser.update(
        { balance },
        { transaction: t, where: { id: transaction.userId } }
      );

      t.commit();
      return TransactionDtaMapper.toDomain(createdTransaction);
    } catch (error) {
      t.rollback();

      return null;
    }
  }

  async findByUserId(userId: number): Promise<Transaction[]> {
    const transactions = await PgTransaction.findAll({
      where: { userId },
      include: [
        {
          model: PgUser,
          as: "users",
        },
        {
          model: PgCategory,
          as: "categories",
        },
      ],
    });

    return transactions.map(TransactionDtaMapper.toDomain);
  }

  async findByDateRange(
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    const transactions = await PgTransaction.findAll({
      where: {
        userId,
        // createdAt: { $gte: startDate, $lte: endDate }
      },
      include: [
        {
          model: PgUser,
          as: "users",
        },
        {
          model: PgCategory,
          as: "categories",
        },
      ],
    });

    return transactions.map(TransactionDtaMapper.toDomain);
  }

  async findByUserAndCategoryId(
    userId: number,
    categoryId: number
  ): Promise<Transaction[]> {
    const transactions = await PgTransaction.findAll({
      where: { categoryId, userId },
      include: [
        {
          model: PgUser,
          as: "users",
        },
        {
          model: PgCategory,
          as: "categories",
        },
      ],
    });

    return transactions.map(TransactionDtaMapper.toDomain);
  }
}
