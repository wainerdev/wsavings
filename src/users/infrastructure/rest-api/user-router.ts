import { transactionController } from "@users/infrastructure/dependencies";
import express from "express";

const userRouter = express.Router();

userRouter.post(
  "/sign-in",
  transactionController.singIn.bind(transactionController)
);
userRouter.post(
  "/sign-up",
  transactionController.singUp.bind(transactionController)
);

export { userRouter };
