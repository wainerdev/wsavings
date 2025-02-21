import { categoryController } from "@categories/infrastructure/dependencies";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.post("/", categoryController.save.bind(categoryController));
categoryRouter.get(
  "/:userId",
  categoryController.getCategoryByUserId.bind(categoryController)
);

export { categoryRouter };
