import { logger } from "../../shared/infrastructure/dependencies";
import { TransactionService } from "../application/transaction-service";
import { TransactionRepository } from "./databases/postgresql/adapter/pg-transaction-repository";
import { TransactionController } from "./rest-api/transaction-controller";

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(
  transactionRepository,
  logger
);

export const transactionController = new TransactionController(transactionService);
