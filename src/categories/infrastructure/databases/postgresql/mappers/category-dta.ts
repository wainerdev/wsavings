import { Category } from "@categories/domain/category";
import {
  CategoryEntity,
  PgCategory,
} from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { UserDtaMapper } from "@users/infrastructure/database/postgresql/mapper/user.dta";

export class CategoryDtaMapper {
  static toEntity(category: Category): CategoryEntity {
    return {
      userId: category.userId as number,
      title: category.title,
    };
  }

  static toDomain(category: PgCategory): Category {
    return new Category(
      category.id,
      category.title,
      category.userId,
      category.users ? UserDtaMapper.toDomain(category.users) : null,
      category.createdAt,
      category.updatedAt
    );
  }
}
