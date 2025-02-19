import { Category } from "@categories/domain/category";
import { PgCategory, CategoryEntity } from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { UserDtaMapper } from "@transactions/infrastructure/databases/postgresql/mappers/user-dta";

export class CategoryDtaMapper {
  static toEntity(category: Category): CategoryEntity {
    return {
      userId: category.userId as number,
      title: category.title
    };
  }

  static toDomain(category: PgCategory): Category {
    console.log('category.users 😀', category.users);
    return new Category(
      category.id,
      category.title,
      category.userId,
      UserDtaMapper.toDomain(category.users),
      category.createdAt,
      category.updatedAt
    );
  }
}