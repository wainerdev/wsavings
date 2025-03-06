import { CategoryDtaMapper } from "@categories/infrastructure/databases/postgresql/mappers/category-dta";
import {
  PgTransaction,
  TransactionRow,
} from "@shared/infrastructure/databases/postgresql/models/PgTransaction";
import { Transaction } from "@transactions/domain/transaction";
import { UserDtaMapper } from "@users/infrastructure/database/postgresql/mapper/user.dta";

export class TransactionDtaMapper {
  static toEntity(transaction: Transaction): TransactionRow {
    return {
      id: transaction.id,
      userId: transaction.userId as number,
      categoryId: transaction.categoryId as number,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type === "INCOME" ? "I" : "E",
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }

  static toDomain(transaction: PgTransaction): Transaction {
    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.users ? UserDtaMapper.toDomain(transaction.users) : null,
      transaction.categoryId,
      transaction.categories
        ? CategoryDtaMapper.toDomain(transaction.categories)
        : null,
      transaction.amount,
      transaction.description,
      transaction.type === "I" ? "INCOME" : "EXPENSE",
      transaction.createdAt,
      transaction.updatedAt
    );
  }
}
