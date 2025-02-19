import { Category } from "@categories/domain/category";

export interface CategoryRepositoryPort {
    save(category: Category): Promise<void>;
    findByUserId(userId: string): Promise<Category[]>;
}