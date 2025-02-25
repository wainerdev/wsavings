import { Category } from "@categories/domain/category";
import { CategoryRepositoryPort } from "@categories/domain/category-repository-port";
import { Logger } from "@shared/domain/logger";

export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepositoryPort,
    private readonly logger: Logger,
    private readonly serviceName: string
  ) {}

  async create(category: Category): Promise<Category> {
    this.logger.info(
      `${this.serviceName} Saving category with userId:${category.userId}`
    );

    const savedCategory = await this.categoryRepository.create(category);

    this.logger.info(
      `${this.serviceName} Category with userId:${category.userId} saved successfully`
    );

    return savedCategory;
  }

  async findByUserId(userId: number): Promise<Category[]> {
    this.logger.info(
      `${this.serviceName} Getting categories for user: ${userId}`
    );

    const categories = await this.categoryRepository.findByUserId(userId);

    this.logger.info(
      `${this.serviceName} Categories for user: ${userId} found: ${categories.length}`
    );

    return categories;
  }

  async deleteCategoryById(
    categoryId: number
  ): Promise<[affectedCount: number]> {
    this.logger.info(
      `${this.serviceName} Deleting category with ID: ${categoryId}`
    );

    const deletedCategory = await this.categoryRepository.deleteCategoryById(
      categoryId
    );

    this.logger.info(
      `${this.serviceName} Category with ID: ${categoryId} deleted successfully`
    );

    return deletedCategory;
  }

  async findByIdAndCategoryId(
    userId: number,
    categoryId: number
  ): Promise<Category | null> {
    this.logger.info(
      `${this.serviceName} Getting category with ID: ${categoryId} for user: ${userId}`
    );

    const foundCategory = await this.categoryRepository.findByIdAndCategoryId(
      userId,
      categoryId
    );

    if (!foundCategory) {
      this.logger.info(
        `${this.serviceName} Category with ID: ${categoryId} for user: ${userId} not found`
      );

      return null;
    }

    this.logger.info(
      `${this.serviceName} Category with ID: ${categoryId} for user: ${userId} found`
    );
    return foundCategory;
  }
}
