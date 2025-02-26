import { middleware } from "@shared/infrastructure/dependencies";
import { transactionController } from "@transactions/infrastructure/dependencies";
import express from "express";

const transactionRouter = express.Router();

transactionRouter.post(
  "/",
  middleware.verifyUser.bind(middleware),
  transactionController.create.bind(transactionController),
  middleware.updateToken.bind(middleware)
);
transactionRouter.get(
  "/:userId",
  middleware.verifyUser.bind(middleware),
  transactionController.getTransactionsByUserId.bind(transactionController),
  middleware.updateToken.bind(middleware)
);
transactionRouter.get(
  "/:userId/:startDate/:endDate",
  middleware.verifyUser.bind(middleware),
  transactionController.getTransactionsByDateRange.bind(transactionController),
  middleware.updateToken.bind(middleware)
);

export { transactionRouter };
