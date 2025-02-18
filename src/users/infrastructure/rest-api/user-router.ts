import express from "express";

import { transactionController } from "../dependencies";

const userRouter = express.Router();

userRouter.post("/", transactionController.saveTransaction.bind(transactionController));
userRouter.get("/:userId", transactionController.findByUserId.bind(transactionController));

export { userRouter };
