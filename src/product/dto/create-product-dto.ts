import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    price: number;

    @IsNumber()
    discountPrice: number;

    @IsString()
    @IsNotEmpty()
    slugName: string;

    @IsString()
    description: string;

    @IsArray()
    categories: number[]; // Array of category IDs
}
