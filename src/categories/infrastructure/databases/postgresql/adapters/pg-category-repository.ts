import "module-alias/register";

import { Category } from "@categories/domain/category";
import { CategoryRepositoryPort } from "@categories/domain/category-repository-port";
import { CategoryDtaMapper } from "@categories/infrastructure/databases/postgresql/mappers/category-dta";
import { PgCategory } from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";

export class CategoryRepository implements CategoryRepositoryPort {
  async save(category: Category): Promise<void> {
    const mappedCategory = CategoryDtaMapper.toEntity(category);

    console.log("saving category", mappedCategory);
    await PgCategory.create(mappedCategory);
  }

  async findByUserId(userId: number): Promise<Category[]> {
    const categories = await PgCategory.findAll({
      where: { userId, isDeleted: false },
      include: {
        model: PgUser,
        as: "users",
      },
    });

    return categories.map(CategoryDtaMapper.toDomain);
  }

  async deleteCategoryById(categoryId: number): Promise<void> {
    await PgCategory.update(
      { isDeleted: true },
      {
        where: { id: categoryId },
      }
    );
  }

  async findByUserIdAndCategoryId(
    userId: number,
    categoryId: number
  ): Promise<Category | null> {
    const category = await PgCategory.findOne({
      where: { userId, id: categoryId, isDeleted: false },
      include: {
        model: PgUser,
        as: "users",
      },
    });

    if (!category) {
      return null;
    }

    return CategoryDtaMapper.toDomain(category);
  }
}
