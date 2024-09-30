
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
            withDelete: true
        });
    }

    findAll(): string {
        return 'return all users details  !';
    }

    async create(user: Partial<Category>): Promise<Category> {
        const newCategory = this.categoryRepository.create(user);
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
}
