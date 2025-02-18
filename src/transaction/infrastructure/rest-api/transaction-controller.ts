import { TransactionService } from "../../application/transaction-service";
import { Request, Response } from "express";
import { TransactionDtoMapper } from "../mapper/TransactionDtoMapper";

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async saveTransaction(req: Request, res: Response) {
    const { id, userId, amount, description, type } = req.body;

    const mappedTransaction = TransactionDtoMapper.toDomain(
      id,
      userId,
      amount,
      description,
      type,
      new Date(),
      new Date()
    );

    await this.transactionService.saveTransaction(mappedTransaction);

    res.status(200).send();
  }

  async getTransactionsByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const transactions = await this.transactionService.getTransactionsByUserId(
      userId
    );

    res.status(200).send(transactions);
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
