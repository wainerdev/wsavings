import { middleware } from "@shared/infrastructure/dependencies";
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
userRouter.get(
  "/profile",
  middleware.verifyUser.bind(middleware),
  transactionController.profile.bind(transactionController),
  middleware.updateToken.bind(middleware)
);

export { userRouter };
