import { Transaction } from "../../domain/transaction";
import { TTransactionType } from "../../domain/transactionType";

export class TransactionDtoMapper {
    static toDto(transaction: Transaction) {
        return {
            id: transaction.id,
            // userId: transaction.userId,
            amount: transaction.amount,
            description: transaction.description,
            type: transaction.type,
        };
    }
    static toDomain(id: number, userId: string, amount: number, description: string, type: string, createdAt: Date, updatedAt: Date) {
        return new Transaction(id, userId, amount, description, type as TTransactionType, createdAt, updatedAt);
    }
}