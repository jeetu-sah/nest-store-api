import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ProductService } from '../product/product.service';

@Module({
    controllers:[CategoryController],
    providers:[CategoryService,ProductService]
})
export class CategoryModule {
 
}
