import { TransactionService } from "@transactions/application/transaction-service";
import { TransactionDtoMapper } from "@transactions/infrastructure/rest-api/mappers/transaction-dto";
import { Request, Response } from "express";

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { id: userId } = req.authUser;
    const { amount, description, type, categoryId } = req.body;

    const domainTransaction = TransactionDtoMapper.toDomain(
      userId,
      categoryId,
      amount,
      description,
      type
    );

    const createdTransaction = await this.transactionService.create(
      domainTransaction
    );

    const dtoTransaction = TransactionDtoMapper.toDto(createdTransaction);

    res.status(200).send({
      transaction: dtoTransaction,
    });
  }

  async getTransactionsByUserId(req: Request, res: Response): Promise<void> {
    const { id: userId } = req.authUser;

    const transactions = await this.transactionService.getTransactionsByUserId(
      userId
    );

    const dtoTransactions = transactions.map(TransactionDtoMapper.toDto);

    res.status(200).send({
      transactions: dtoTransactions,
    });
  }

  async getTransactionsByDateRange(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.body;
    const { id: userId } = req.authUser;

    const transactions =
      await this.transactionService.getTransactionsByDateRange(
        userId,
        startDate,
        endDate
      );

    const dtoTransactions = transactions.map(TransactionDtoMapper.toDto);

    res.status(200).send({
      transactions: dtoTransactions,
    });
  }

  async findByUserAndCategoryId(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;
    const { id: userId } = req.authUser;

    const transactions = await this.transactionService.findByCategoryId(
      userId,
      Number(categoryId)
    );

    const dtoTransactions = transactions.map(TransactionDtoMapper.toDto);

    res.status(200).send({
      transactions: dtoTransactions,
    });
  }
}
