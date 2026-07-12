import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, MinLength, IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        description: 'First Name',
        example: 'John'
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Last Name',
        example: 'Doe'
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'Email',
        example: 'john.doe@mail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password',
        example: 'Pass@123'
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'Role',
        enum: Role
    })
    @IsEnum(Role)
    role: Role;
}

export class LoginDto {
    @ApiProperty({
        description: 'Email',
        example: 'john.doe@mail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password',
        example: 'Pass@123'
    })
    @IsString()
    @MinLength(6)
    password: string;
}