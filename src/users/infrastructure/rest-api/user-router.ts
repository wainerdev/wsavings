import { transactionController } from "@users/infrastructure/dependencies";
import express from "express";

const userRouter = express.Router();

userRouter.post(
  "/sing-in",
  transactionController.singIn.bind(transactionController)
);
userRouter.get(
  "/sing-up",
  transactionController.singUp.bind(transactionController)
);

export { userRouter };
