import { TransactionService } from "@transactions/application/transaction-service";
import { TransactionDtoMapper } from "@transactions/infrastructure/rest-api/mappers/transaction-dto";
import { Request, Response } from "express";

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async saveTransaction(req: Request, res: Response) {
    const { userId, amount, description, type } = req.body;

    const mappedTransaction = TransactionDtoMapper.toDomain(
      userId,
      amount,
      description,
      type
    );

    await this.transactionService.saveTransaction(mappedTransaction);

    res.status(200).send();
  }

  async getTransactionsByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const transactions = await this.transactionService.getTransactionsByUserId(
      userId
    );

    const mappedTransactions = transactions.map(TransactionDtoMapper.toDto);

    res.status(200).send(mappedTransactions);
  }

  async getTransactionsByDateRange(req: Request, res: Response) {
    const { userId, startDate, endDate } = req.body;

    const transactions =
      await this.transactionService.getTransactionsByDateRange(
        userId,
        startDate,
        endDate
      );

    const mappedTransactions = transactions.map(TransactionDtoMapper.toDto);

    res.status(200).send(mappedTransactions);
  }
}
