import { categoryController } from "@categories/infrastructure/dependencies";
import { middleware } from "@shared/infrastructure/dependencies";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  middleware.verifyUser.bind(middleware),
  categoryController.create.bind(categoryController)
);
categoryRouter.get(
  "/",
  middleware.verifyUser.bind(middleware),
  categoryController.findByUserId.bind(categoryController)
);
categoryRouter.delete(
  "/:categoryId",
  middleware.verifyUser.bind(middleware),
  categoryController.deleteCategoryByUserId.bind(categoryController)
);
categoryRouter.get(
  "/:categoryId",
  middleware.verifyUser.bind(middleware),
  categoryController.findByUserIdAndCategoryId.bind(categoryController)
);

export { categoryRouter };
