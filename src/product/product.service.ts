import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { CreateProductDto } from './dto/create-product-dto';


@Injectable()
export class ProductService {
  private productRepository;
  private productCategoryRepository;

  constructor(private dataSource: DataSource) {
    this.productRepository = this.dataSource.getRepository(Product); 
  }

  find(): Promise<Product[]> {
    console.log("Product",this.productRepository)
    return this.productRepository.find({
      withDeleted: false,
      relations:{
        categories:true
      }
    });
  }

  findAll(): string {
    return 'Return all product details!';
  }



async create(dto:CreateProductDto){
  const product= this.productRepository.create(dto);
  product.categories= dto.categories.map(id=>({... new Category(),id}))

  return await this.productRepository.save(product)

}







  

  async delete(id: number) {
    return this.productRepository.softDelete({ id });
  }

  async details(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id }, relations:{
      categories:true
    } });
  }

  async update(product: Partial<Product>): Promise<Product> {
    return this.productRepository.save(product);
  }

  async detailProductForCategory(category_Id: number): Promise<Product[]> {
    return this.productRepository.findBy({ category_Id });
  }
}
