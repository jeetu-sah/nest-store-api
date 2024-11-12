import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'; 
export class CreateLoginDto {
   
  
    @IsString()
    @IsNotEmpty({ message: 'description is required' })  
    username: string;
  
    @IsString()
    @IsNotEmpty({ message: 'slugname is required' })  
    password: string;
 
    // @IsInt()
  @IsOptional()
  parent_id: number;
}