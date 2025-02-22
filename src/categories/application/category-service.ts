import { Category } from "@categories/domain/category";
import { CategoryRepositoryPort } from "@categories/domain/category-repository-port";
import { Logger } from "@shared/domain/logger";

export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepositoryPort,
    private readonly logger: Logger
  ) {}

  async save(category: Category): Promise<void> {
    this.logger.info(
      `[Category Service222] - Saving category for user: ${category.userId}`
    );

    await this.categoryRepository.save(category);

    this.logger.info("[Category Service] - Category saved successfully");
  }

  async findByUserId(userId: number): Promise<Category[]> {
    this.logger.info(
      `[Category Service-finddddd] - Getting categories for user: ${userId}`
    );

    const categories = await this.categoryRepository.findByUserId(userId);

    this.logger.info(
      `[Category Service] - Found ${categories.length} categories for user: ${userId}`
    );

    return categories;
  }

  async deleteCategoryById(categoryId: number): Promise<void> {
    this.logger.info(
      `[Category Service] - Deleting category by ID: ${categoryId}`
    );

    await this.categoryRepository.deleteCategoryById(categoryId);

    this.logger.info(
      `[Category Service] - Category with ID: ${categoryId} deleted successfully`
    );
  }

  async findByUserIdAndCategoryId(
    userId: number,
    categoryId: number
  ): Promise<Category | null> {
    this.logger.info(
      `[Category Service] - Getting category by ID: ${categoryId} for user: ${userId}`
    );

    const category = await this.categoryRepository.findByUserIdAndCategoryId(
      userId,
      categoryId
    );

    if (!category) {
      this.logger.info(
        `[Category Service] - Category with ID: ${categoryId} not found for user: ${userId}`
      );
    } else {
      this.logger.info(
        `[Category Service] - Found category with ID: ${categoryId} for user: ${userId}`
      );
    }

    return category;
  }
}
