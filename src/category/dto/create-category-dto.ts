import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'; 
export class CreateCategoryDto {
   
  
    @IsString()
    @IsNotEmpty({ message: 'description is required' })  
    description: string;
  
    @IsString()
    @IsNotEmpty({ message: 'slugname is required' })  
    slugname: string;
 
    // @IsInt()
  @IsOptional()
  parent_id: number;
}