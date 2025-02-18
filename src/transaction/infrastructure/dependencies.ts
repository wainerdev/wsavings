import { logger } from "../../shared/infrastructure/dependencies";
import { TransactionService } from "../application/transaction-service";
import { PostgresqlTransactionRepository } from "./database/postgresql/adapter/postgresql-transaction-repository";
import { TransactionController } from "./rest-api/transaction-controller";

const transactionRepository = new PostgresqlTransactionRepository();
const transactionService = new TransactionService(
  transactionRepository,
  logger
);

export const transactionController = new TransactionController(transactionService);
