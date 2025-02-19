import express from "express";

import { transactionController } from "@transactions/infrastructure/dependencies";

const transactionRouter = express.Router();

transactionRouter.post("/", transactionController.saveTransaction.bind(transactionController));
transactionRouter.get("/:userId", transactionController.getTransactionsByUserId.bind(transactionController));
transactionRouter.get("/:userId/:startDate/:endDate", transactionController.getTransactionsByDateRange.bind(transactionController));

export { transactionRouter };
