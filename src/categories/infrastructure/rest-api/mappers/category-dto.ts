import { Category } from "@categories/domain/category";

export class CategoryDtoMapper {
  static toDto(category: Category): unknown {
    return {
      id: category.id,
      title: category.title,
      userId: category.userId,
      user: category.user,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
  static toDomain(
    id: number,
    userId: number,
    title: string,
    createdAt: Date,
    updatedAt: Date
  ): Category {
    return new Category(id, title, userId, null, createdAt, updatedAt);
  }
}
