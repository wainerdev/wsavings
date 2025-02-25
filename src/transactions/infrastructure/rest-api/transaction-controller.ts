import { TransactionService } from "@transactions/application/transaction-service";
import { TransactionDtoMapper } from "@transactions/infrastructure/rest-api/mappers/transaction-dto";
import { Request, Response } from "express";

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async create(req: Request, res: Response) {
    const { userId, amount, description, type } = req.body;

    const domainTransaction = TransactionDtoMapper.toDomain(
      userId,
      amount,
      description,
      type
    );

    const createdTransaction = await this.transactionService.create(
      domainTransaction
    );

    const dtoTransaction = TransactionDtoMapper.toDto(createdTransaction);

    return res.status(200).send(dtoTransaction);
  }

  async getTransactionsByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const transactions = await this.transactionService.getTransactionsByUserId(
      userId
    );

    const dtoTransactions = transactions.map(TransactionDtoMapper.toDto);

    return res.status(200).send(dtoTransactions);
  }

  async getTransactionsByDateRange(req: Request, res: Response) {
    const { userId, startDate, endDate } = req.body;

    const transactions =
      await this.transactionService.getTransactionsByDateRange(
        userId,
        startDate,
        endDate
      );

    const dtoTransactions = transactions.map(TransactionDtoMapper.toDto);

    return res.status(200).send(dtoTransactions);
  }
}
