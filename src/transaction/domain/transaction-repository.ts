import { Transaction } from "./transaction";

export interface TransactionRepository {
    save(transaction: Transaction): Promise<void>;
    findByUserId(userId: string): Promise<Transaction[]>;
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transaction[]>;
}