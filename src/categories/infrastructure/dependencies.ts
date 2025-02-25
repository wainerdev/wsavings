import { CategoryService } from "@categories/application/category-service";
import { CategoryRepository } from "@categories/infrastructure/databases/postgresql/adapters/pg-category-repository";
import { CategoryController } from "@categories/infrastructure/rest-api/category-controller";
import { logger } from "@shared/infrastructure/dependencies";

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(
  categoryRepository,
  logger,
  "[Category Service]"
);

export const categoryController = new CategoryController(categoryService);
