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
    return this.productRepository.find({
      withDeleted: false,
    });
  }

  findAll(): string {
    return 'Return all product details!';
  }


//   async create(productData: Partial<Product>): Promise<Product> {
//     const { categories, ...productDetails } = productData;
 
//     const newProduct = this.productRepository.create(productDetails);
 
//     if (categories && categories.length > 0) {
//         const categoryEntities = await this.dataSource.getRepository(Category).findByIds(categories);
//         newProduct.categories = categoryEntities;
//     }
 
//     const savedProduct = await this.productRepository.save(newProduct);
 
//     return this.productRepository.findOne({
//         where: { id: savedProduct.id },
//         relations: ['categories'],  
//     });
// }

async create(dto:CreateProductDto){
  const product= this.productRepository.create(dto);
  product.categories= dto.categories.map(id=>({... new Category(),id}))
}







  

  async delete(id: number) {
    return this.productRepository.softDelete({ id });
  }

  async details(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(product: Partial<Product>): Promise<Product> {
    return this.productRepository.save(product);
  }

  async detailProductForCategory(category_Id: number): Promise<Product[]> {
    return this.productRepository.findBy({ category_Id });
  }
}
