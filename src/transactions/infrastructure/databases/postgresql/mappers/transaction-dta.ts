import { TransactionRow, PgTransaction } from "@shared/infrastructure/databases/postgresql/models/PgTransaction";
import { Transaction } from "@transactions/domain/transaction";
import { UserDtaMapper } from "@transactions/infrastructure/databases/postgresql/mappers/user-dta";

export class TransactionDtaMapper {
  static toEntity(
    transaction: Transaction
  ): TransactionRow{
    return {
      id: transaction.id,
      userId: transaction.userId as number,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    };
    
  }

  static toDomain(transaction: PgTransaction): Transaction {
    return new Transaction(
      transaction.id,
      transaction.userId,
      UserDtaMapper.toDomain(transaction.users),
      transaction.amount,
      transaction.description,
      transaction.type === 'I' ? 'INCOME' : 'EXPENSE',
      transaction.createdAt,
      transaction.updatedAt
    );
  }
}
