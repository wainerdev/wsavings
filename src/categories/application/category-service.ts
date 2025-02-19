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

  async findByUserId(userId: string): Promise<Category[]> {
    this.logger.info(
      `[Category Service-finddddd] - Getting categories for user: ${userId}`
    );

    const categories =  await this.categoryRepository.findByUserId(userId);

    this.logger.info(
      `[Category Service] - Found ${categories.length} categories for user: ${userId}`
    );

    return categories
  }
}
