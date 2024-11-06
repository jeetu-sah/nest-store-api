
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Category } from './category.entity'

@Injectable()
export class CategoryService {
    private categoryRepository;

    constructor(private dataSource: DataSource) {
        this.categoryRepository = this.dataSource.getRepository(Category);
    }

    find(): Promise<Category[]> {
        return this.categoryRepository.find({
            withDeleted: true,  // Optional: include soft-deleted categories
            relations: ['subcategories', 'parent_id'] // Automatically fetch subcategories (children)

        });
    }

    findAll(): string {
        return 'return all users details  !';
    }

    async create(categoryData: Partial<Category>): Promise<Category> {
        const newCategory = this.categoryRepository.create(categoryData);

        if (categoryData.parent_id) {
            const parentCategory = await this.categoryRepository.findOneBy({ id: categoryData.parent_id });
            newCategory.parent_id = parentCategory;
        }
        return this.categoryRepository.save(newCategory);
    }

    async delete(id: number) {
        return this.categoryRepository.softDelete({ id });
    }

    async details(id: number) {
        return this.categoryRepository.findOneBy({ id });
    }
    async update(Category) {
        return this.categoryRepository.save(Category)
    }

    async detailProductForCategory(parent_id: number) {
        // return "abc"
        return this.categoryRepository.findBy({ parent_id });

    }
}
