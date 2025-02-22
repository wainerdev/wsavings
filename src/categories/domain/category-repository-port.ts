import { Category } from "@categories/domain/category";

export interface CategoryRepositoryPort {
  save(category: Category): Promise<void>;
  findByUserId(userId: number): Promise<Category[]>;
  deleteCategoryById(categoryId: number): Promise<void>;
  findByUserIdAndCategoryId(
    userId: number,
    categoryId: number
  ): Promise<Category | null>;
}
