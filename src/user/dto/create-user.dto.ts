import { IsDecimal, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {

    @IsString()
    @IsNotEmpty({ message: 'firstName is required' })
    firstName: string;

    @IsString()
    @IsNotEmpty({ message: 'lastName is required' })
    lastName: string;

    @IsEmail()
    @IsNotEmpty({ message: 'email is required' })
    email: string;

    @IsNotEmpty({ message: 'number is required' })
    mobile: number;

    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'maritalStatus is required' })
    maritalStatus: string;

    @IsNotEmpty({ message: 'weight is required' })
    weight: number;

    @IsString()
    @IsNotEmpty({ message: 'bloodGroup is required' })
    bloodGroup: string;

    @IsNotEmpty({ message: 'Height is required' })
    height: number;

    @IsString()
    @IsNotEmpty({ message: 'Higest Qualification is required' })
    higestQualification: string;


}
