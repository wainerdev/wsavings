import { CategoryService } from "@categories/application/category-service";
import { CategoryDtoMapper } from "@categories/infrastructure/rest-api/mappers/category-dto";
import { Request, Response } from "express";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { title } = req.body;
    const { id: userId } = req.authUser;

    const domainCategory = CategoryDtoMapper.toDomain(userId, title);

    const createdCategory = await this.categoryService.create(domainCategory);

    const dtoCategory = CategoryDtoMapper.toDto(createdCategory);

    res.status(200).send({
      category: dtoCategory,
    });
  }

  async findByUserId(req: Request, res: Response): Promise<void> {
    const { id } = req.authUser;
    const categories = await this.categoryService.findByUserId(id);

    const dtoCategories = categories.map(CategoryDtoMapper.toDto);

    res.status(200).send({
      categories: dtoCategories,
    });
  }

  async deleteCategoryByUserId(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    const [affectedCount] = await this.categoryService.deleteCategoryById(
      Number(categoryId)
    );

    res.status(200).send({ affectedCount });
  }

  async findByUserIdAndCategoryId(req: Request, res: Response): Promise<void> {
    const { id } = req.authUser;
    const { categoryId } = req.params;

    const category = await this.categoryService.findByIdAndCategoryId(
      id,
      Number(categoryId)
    );

    const dtoCategory = category && CategoryDtoMapper.toDto(category);

    res.status(200).send({
      category: dtoCategory,
    });
  }
}
