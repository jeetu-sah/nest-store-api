import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'; 
export class CreateAdminDto{
   
    @IsString()
    @IsNotEmpty({ message: 'firstName is required and must be an integer' })  
    firstName: string;
  
    @IsString()
    @IsNotEmpty({ message: 'lastName is required and must be an integer' })  
    lastName: string;
  

  
 
}