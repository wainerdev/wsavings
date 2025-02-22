import { categoryController } from "@categories/infrastructure/dependencies";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.post("/", categoryController.save.bind(categoryController));
categoryRouter.get(
  "/",
  categoryController.getCategoryByUserId.bind(categoryController)
);
categoryRouter.delete(
  "/:categoryId",
  categoryController.deleteCategoryByUserId.bind(categoryController)
);
categoryRouter.get(
  "/:categoryId",
  categoryController.getCategoryByUserIdAndCategoryId.bind(categoryController)
);

export { categoryRouter };
