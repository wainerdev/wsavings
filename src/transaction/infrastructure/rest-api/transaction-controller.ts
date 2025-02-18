import { TransactionService } from "../../application/transaction-service";
import { Request, Response } from "express";
import { TransactionDtoMapper } from "./mappers/transaction-dto";

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async saveTransaction(req: Request, res: Response) {
    const today = new Date("2021-01-01");
    const { id, userId, amount, description, type } = req.body;

    const mappedTransaction = TransactionDtoMapper.toDomain(
      id,
      userId,
      amount,
      description,
      type,
      today,
      today
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

    res.status(200).send(transactions);
  }
}
