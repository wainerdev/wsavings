import { Request, Response } from "express";
import { CategoryService } from "@categories/application/category-service";
import { CategoryDtoMapper } from "@categories/infrastructure/rest-api/mappers/category-dto";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async save(req: Request, res: Response) {
    const today = new Date();
    const { id, userId, title} = req.body;

    const mappedCategory = CategoryDtoMapper.toDomain(
      id,
      userId,
      title,
      today,
      today
    );

    await this.categoryService.save(mappedCategory);

    res.status(200).send();
  }

  async getCategoryByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const categories = await this.categoryService.findByUserId(
      userId
    );

    const mappedCategories= categories.map(CategoryDtoMapper.toDto);

    res.status(200).send(mappedCategories);
  }
}
