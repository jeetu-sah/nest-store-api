import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './product.entity'

@Injectable()
export class ProductService {
    private productRepository;

    constructor(private dataSource: DataSource) {
        this.productRepository = this.dataSource.getRepository(Product);
    }

    find(): Promise<Product[]> {
        return this.productRepository.find({
            withDeleted: true,
        });
    }

    findAll(): string {
        return 'return all users details  !';
    }

    async create(user: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(user);
        return this.productRepository.save(newProduct);
    }

    async delete(id: number) {
        return this.productRepository.softDelete({ id });

    }

    async details(id: number): Promise<Product | null> {
        return this.productRepository.findOne({ where: { id } });
    }
    
    async update(product) {
        return this.productRepository.save(product)
    }

    async detailProductForCategory(category_Id: number) {
        // return "abc"
        return this.productRepository.findBy({ category_Id });

    }



    // async restoreUser(id: number) {
    //     return "this.productRepository.restore(id)";


    //     await this.productRepository
    //         .restore(id)
    //     //   .where("id = :id", { id: id })
    //     //   .execute();
    // }

}
