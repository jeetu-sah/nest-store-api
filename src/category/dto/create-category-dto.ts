import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'; 
export class CreateCategoryDto {
   
    @IsString()
    @IsNotEmpty({ message: 'categoryName is required' })   
    categoryName: string;
  
    @IsString()
    @IsNotEmpty({ message: 'description is required' })  
    description: string;
  
    @IsString()
    @IsNotEmpty({ message: 'slugname is required' })  
    slugname: string;

    @IsInt()
    @IsNotEmpty({ message: 'parent_id is required' })  
    parent_id: number;
 
  

}