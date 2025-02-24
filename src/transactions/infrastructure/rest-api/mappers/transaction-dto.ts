import { Transaction } from "@transactions/domain/transaction";
import type { TransactionType } from "@transactions/domain/transactionType";

export class TransactionDtoMapper {
  static toDto(transaction: Transaction): unknown {
    return {
      id: transaction.id,
      userId: transaction.userId,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
      user: transaction.user,
    };
  }
  static toDomain(
    userId: number,
    amount: number,
    description: string,
    type: string
  ): Transaction {
    return new Transaction(
      null as unknown as number,
      userId,
      null,
      amount,
      description,
      type as TransactionType,
      null as unknown as Date,
      null as unknown as Date
    );
  }
}
