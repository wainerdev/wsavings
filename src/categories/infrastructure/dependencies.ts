import { CategoryService } from "@categories/application/category-service";
import { logger } from "@shared/infrastructure/dependencies";
import { CategoryRepository } from "@categories/infrastructure/databases/postgresql/adapters/pg-category-repository";
import { CategoryController } from "@categories/infrastructure/rest-api/category-controller";

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(
  categoryRepository,
  logger
);

export const categoryController = new CategoryController(categoryService);
