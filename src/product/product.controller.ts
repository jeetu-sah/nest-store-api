import { Controller, Delete, Get, HttpStatus, Param, Post, Req, Res, Patch, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ProductService } from './product.service'
import { Request, Response } from 'express';
import { CreateProductDto } from './dto/create-product-dto';

@Controller('product')
export class ProductController {
    constructor(private readonly ProductService: ProductService) { }
    @Get("")
    find() {
        return this.ProductService.find();
    }

    @Post("/create")
    @UsePipes(new ValidationPipe())
    async create(@Body() body: CreateProductDto, @Req() request: Request, @Res() res: Response) {
        const productCreate = await this.ProductService.create(request.body)
        res.status(HttpStatus.OK).json({ msg: "New product created", data: productCreate });
    }

    @Get('/:id')
    async productDetails(@Param('id') id: number, @Res() res: Response) {
        const detailsResponse = await this.ProductService.details(id);
        if (detailsResponse) {
            res.status(HttpStatus.OK).json({ msg: "your data...", data: detailsResponse });
        } else {
            res.status(HttpStatus.OK).json({ data: null, msg: 'no record found' });
        }
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: number, @Res() res: Response) {
        const detailsProduct = await this.ProductService.details(id);
        if (detailsProduct) {
            const deleteResponse = await this.ProductService.delete(id);
            res.status(HttpStatus.OK).json({ msg: "daleted data...", data: deleteResponse });
        } else {
            res
                .status(HttpStatus.OK)
                .json({ data: null, msg: 'Product Does not exists' });
        }
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: number, @Req() request: Request, @Res() res: Response) {
        const productId = await this.ProductService.details(id)
        if (productId) {
            productId['productName'] = request.body.productName;
            productId['price'] = request.body.price;
            productId['discountPrice'] = request.body.discountPrice;
            productId['slugName'] = request.body.slugName;
            productId['description'] = request.body.description;
            productId['category'] = request.body.category;
            const updateProductData = await this.ProductService.update(productId);
            res.status(HttpStatus.OK).json({ msg: "Data updated successfully", data: updateProductData });
        } else {
            res.status(HttpStatus.OK).json({ msg: "product not exist", data: null })
        }
    }
}


