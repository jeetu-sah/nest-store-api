import { Controller, Delete, Get, HttpStatus, Param, Post, Req, Res, Patch, Body } from '@nestjs/common';
import { CategoryService } from './category.service'
import { Request, Response } from 'express';
import { ProductService } from '../product/product.service';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly CategoryService: CategoryService, private readonly ProductService: ProductService) { }
    @Get("")
    find() {
        return this.CategoryService.find();
    }

    @Post("/create")
    async create(@Body() body:CreateCategoryDto,@Req() request: Request, @Res() res: Response) {

        const categoryCreate = await this.CategoryService.create(request.body)
        res.status(HttpStatus.OK).json({ msg: 'New category created...', data: categoryCreate });
    }

    @Get('/:id')
    async categoryDetails(@Param('id') id: number, @Res() res: Response) {
        const detailsResponse = await this.CategoryService.details(id);
        if (detailsResponse) {
            res.status(HttpStatus.OK).json({ msg: ' Data...', data: detailsResponse });
        } else {
            res.status(HttpStatus.OK).json({ data: null, msg: 'no record found' });
        }
    }

    @Delete('/:id')
    async deleteoCategry(@Param('id') id: number, @Res() res: Response) {
        const detailsCategory = await this.CategoryService.details(id);
        if (detailsCategory) {
            const deleteResponse = await this.CategoryService.delete(id);
            res.status(HttpStatus.OK).json({ msg: 'one row deleted', data: deleteResponse });
        } else {
            res
                .status(HttpStatus.OK)
                .json({ data: null, msg: 'Categry Does not exists' });
        }
    }

    @Patch(':id')
    async updateCategory(@Param('id') id: number, @Req() request: Request, @Res() res: Response) {
        const categoryId = await this.CategoryService.details(id)
        if (categoryId) {
            categoryId['categoryName'] = request.body.categoryName;
            categoryId['price'] = request.body.price;
            categoryId['discountPrice'] = request.body.discountPrice;
            categoryId['slugName'] = request.body.slugName;
            categoryId['description'] = request.body.description;
            categoryId['category'] = request.body.category;
            const updateCategoryData = await this.CategoryService.update(categoryId);
            res.status(HttpStatus.OK).json({ msg: "Data updated successfully", data: updateCategoryData });
        } else {
            res.status(HttpStatus.OK).json({ msg: "category not exist", data: null })
        }
    }

    @Get('/products/:parent_Id')
    async categoryProductDetails(@Param('parent_Id') parent_Id: number, @Res() res: Response) {
        const detailsResponse = await this.ProductService.detailProductForCategory(parent_Id);
        if (detailsResponse) {
            res.status(HttpStatus.OK).json({ msg: "Products are....", data: detailsResponse });
        } else {
            res.status(HttpStatus.OK).json({ data: null, msg: 'no record found' });
        }
    }

}


