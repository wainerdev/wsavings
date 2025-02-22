import { CategoryService } from "@categories/application/category-service";
import { CategoryDtoMapper } from "@categories/infrastructure/rest-api/mappers/category-dto";
import { Request, Response } from "express";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async save(req: Request, res: Response) {
    const today = new Date();
    const { id, userId, title } = req.body;

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
    const userId = 1;

    const categories = await this.categoryService.findByUserId(Number(userId));

    const mappedCategories = categories.map(CategoryDtoMapper.toDto);

    res.status(200).send(mappedCategories);
  }

  async deleteCategoryByUserId(req: Request, res: Response) {
    const { categoryId } = req.params;

    await this.categoryService.deleteCategoryById(Number(categoryId));

    res.status(200).send();
  }

  async getCategoryByUserIdAndCategoryId(req: Request, res: Response) {
    const { categoryId } = req.params;
    const userId = 1;

    const category = await this.categoryService.findByUserIdAndCategoryId(
      userId,
      Number(categoryId)
    );

    res.status(200).send(category);
  }
}
