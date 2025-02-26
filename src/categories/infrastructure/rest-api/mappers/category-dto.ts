import { Category } from "@categories/domain/category";
import { UserSignInDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signin-dto";

export class CategoryDtoMapper {
  static toDto(category: Category): unknown {
    return {
      id: category.id,
      title: category.title,
      userId: category.userId,
      user: category.user ? UserSignInDtoMapper.toDto(category.user) : null,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
  static toDomain(userId: number, title: string): Category {
    return new Category(
      null as unknown as number,
      title,
      userId,
      null,
      null as unknown as Date,
      null as unknown as Date
    );
  }
}
