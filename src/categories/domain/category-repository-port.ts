import { Category } from "@categories/domain/category";

export interface CategoryRepositoryPort {
  create(category: Category): Promise<Category>;
  findByUserId(userId: number): Promise<Category[]>;
  deleteCategoryById(categoryId: number): Promise<[affectedCount: number]>;
  findByIdAndCategoryId(
    userId: number,
    categoryId: number
  ): Promise<Category | null>;
  update(categoryId: number, category: Category): Promise<Category>;
}
