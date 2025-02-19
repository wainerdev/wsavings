import { Transaction } from "@transactions/domain/transaction";
import type { TransactionType } from "@transactions/domain/transactionType";

export class TransactionDtoMapper {
  static toDto(transaction: Transaction): Object {
    return {
      id: transaction.id,
      userId: transaction.userId,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
      user: transaction.user
    };
  }
  static toDomain(
    id: number,
    userId: number,
    amount: number,
    description: string,
    type: string,
    createdAt: Date,
    updatedAt: Date
  ): Transaction {
    return new Transaction(
      id,
      userId,
      null,
      amount,
      description,
      type as TransactionType,
      createdAt,
      updatedAt
    );
  }
}
