import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'; 
export class CreateProductDto {
   
    @IsString()
    @IsNotEmpty({ message: 'productName is required' })  
    productName: string;
  
    @IsNotEmpty({ message: 'price is required and must be an integer' })  
    @IsInt()  
    price: number;
   
    @IsNotEmpty({ message: 'discountPrice is required and must be an integer' })  
    @IsInt() 
    discountPrice: number;
   
    @IsString()
    @IsNotEmpty({ message: 'slugName is required' }) 
    slugName: string;
   
    @IsString()
    @IsNotEmpty({ message: 'description is required' }) 
    description: string;
   
    @IsNotEmpty({ message: 'category_Id is required and must be an integer' })  
    @IsInt() 
    category_Id: number;
   
 
  

}