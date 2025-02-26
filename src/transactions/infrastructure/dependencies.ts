import { logger } from "@shared/infrastructure/dependencies";
import { TransactionService } from "@transactions/application/transaction-service";
import { TransactionRepository } from "@transactions/infrastructure/databases/postgresql/adapter/pg-transaction-repository";
import { TransactionController } from "@transactions/infrastructure/rest-api/transaction-controller";

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(
  transactionRepository,
  logger
);

export const transactionController = new TransactionController(
  transactionService
);
