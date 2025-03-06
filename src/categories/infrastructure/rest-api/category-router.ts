import { categoryController } from "@categories/infrastructure/dependencies";
import { middleware } from "@shared/infrastructure/dependencies";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  middleware.verifyUser.bind(middleware),
  categoryController.create.bind(categoryController),
  middleware.updateToken.bind(middleware)
);
categoryRouter.put(
  "/:categoryId",
  middleware.verifyUser.bind(middleware),
  categoryController.update.bind(categoryController),
  middleware.updateToken.bind(middleware)
);
categoryRouter.get(
  "/",
  middleware.verifyUser.bind(middleware),
  categoryController.findByUserId.bind(categoryController),
  middleware.updateToken.bind(middleware)
);
categoryRouter.delete(
  "/:categoryId",
  middleware.verifyUser.bind(middleware),
  middleware.updateToken.bind(middleware),
  categoryController.deleteCategoryByUserId.bind(categoryController)
);
categoryRouter.get(
  "/:categoryId",
  middleware.verifyUser.bind(middleware),
  middleware.updateToken.bind(middleware),
  categoryController.findByUserIdAndCategoryId.bind(categoryController)
);

export { categoryRouter };
