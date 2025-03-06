import { CategoryDtoMapper } from "@categories/infrastructure/rest-api/mappers/category-dto";
import { Transaction } from "@transactions/domain/transaction";
import type { TransactionType } from "@transactions/domain/transactionType";
import { UserSignInDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signin-dto";

export class TransactionDtoMapper {
  static toDto(transaction: Transaction): unknown {
    return {
      id: transaction.id,
      userId: transaction.userId,
      categoryId: transaction.categoryId,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
      user: transaction.user
        ? UserSignInDtoMapper.toDto(transaction.user)
        : null,
      category: transaction.category
        ? CategoryDtoMapper.toDto(transaction.category)
        : null,
    };
  }
  static toDomain(
    userId: number,
    categoryId: number,
    amount: number,
    description: string,
    type: string
  ): Transaction {
    return new Transaction(
      null as unknown as number,
      userId,
      null,
      categoryId,
      null,
      amount,
      description,
      type as TransactionType,
      null as unknown as Date,
      null as unknown as Date
    );
  }
}
