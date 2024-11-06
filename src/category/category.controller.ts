import { Controller, Delete, Get, HttpStatus, Param, Post, Req, Res, Patch, Body } from '@nestjs/common';
import { CategoryService } from './category.service'
import { Request, Response } from 'express';
import { ProductService } from '../product/product.service';
import { CreateCategoryDto } from './dto/create-category-dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly CategoryService: CategoryService, private readonly ProductService: ProductService) { }
    @Get()
    find(): Promise<Category[]> {
        return this.CategoryService.find();
    }

    @Post("/create")
    async create(@Body() body:CreateCategoryDto,@Req() request: Request, @Res() res: Response) {

        const categoryCreate = await this.CategoryService.create(request.body)
        console.log(categoryCreate)
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
            categoryId['id'] = request.body.id;
            categoryId['description'] = request.body.description;
            categoryId['slugname'] = request.body.slugname;
            categoryId['parent_id'] = request.body.parent_id;
            const updateCategoryData = await this.CategoryService.update(categoryId);
            res.status(HttpStatus.OK).json({ msg: "Data updated successfully", data: updateCategoryData });
        } else {
            res.status(HttpStatus.OK).json({ msg: "category not exist", data: null })
        }
    }

    @Get('/categories/:parent_id')
    async categorysubDetails(@Param('parent_id') parent_id: number, @Res() res: Response) {
        const detailsResponse = await this.CategoryService.detailProductForCategory(parent_id);
        console.log(detailsResponse)
        if (detailsResponse) {
            res.status(HttpStatus.OK).json({ msg: "Products are....", data: detailsResponse });
        } else {
            res.status(HttpStatus.OK).json({ data: null, msg: 'no record found' });
        }
    }




    @Get('/products/:parent_id')
    async categoryProductDetails(@Param('parent_id') parent_id: number, @Res() res: Response) {
        const detailsResponse = await this.ProductService.detailProductForCategory(parent_id);
        console.log(detailsResponse)
        if (detailsResponse) {
            res.status(HttpStatus.OK).json({ msg: "Products are....", data: detailsResponse });
        } else {
            res.status(HttpStatus.OK).json({ data: null, msg: 'no record found' });
        }
    }

}


