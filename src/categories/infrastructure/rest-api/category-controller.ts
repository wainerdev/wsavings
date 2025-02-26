import { CategoryService } from "@categories/application/category-service";
import { CategoryDtoMapper } from "@categories/infrastructure/rest-api/mappers/category-dto";
import { Request, Response } from "express";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { userId, title } = req.body;

    const domainCategory = CategoryDtoMapper.toDomain(userId, title);

    const createdCategory = await this.categoryService.create(domainCategory);

    const dtoCategory = CategoryDtoMapper.toDto(createdCategory);

    res.status(200).send(dtoCategory);
  }

  async getCategoryByUserId(_: Request, res: Response): Promise<void> {
    const userId = 1;

    const categories = await this.categoryService.findByUserId(Number(userId));

    const dtoCategories = categories.map(CategoryDtoMapper.toDto);

    res.status(200).send(dtoCategories);
  }

  async deleteCategoryByUserId(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    const [affectedCount] = await this.categoryService.deleteCategoryById(
      Number(categoryId)
    );

    res.status(200).send({ affectedCount });
  }

  async getCategoryByUserIdAndCategoryId(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = 1;
    const { categoryId } = req.params;

    const category = await this.categoryService.findByIdAndCategoryId(
      userId,
      Number(categoryId)
    );

    const dtoCategory = category && CategoryDtoMapper.toDto(category);

    res.status(200).send(dtoCategory);
  }
}
