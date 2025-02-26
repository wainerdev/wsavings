import { Category } from "@categories/domain/category";
import { CategoryRepositoryPort } from "@categories/domain/category-repository-port";
import { CategoryDtaMapper } from "@categories/infrastructure/databases/postgresql/mappers/category-dta";
import { PgCategory } from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";

export class CategoryRepository implements CategoryRepositoryPort {
  async create(category: Category): Promise<Category> {
    const entityCategory = CategoryDtaMapper.toEntity(category);

    const createdCategory = await PgCategory.create(entityCategory);

    return CategoryDtaMapper.toDomain(createdCategory);
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

  async deleteCategoryById(
    categoryId: number
  ): Promise<[affectedCount: number]> {
    return PgCategory.update(
      { isDeleted: true },
      {
        where: { id: categoryId },
      }
    );
  }

  async findByIdAndCategoryId(
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
