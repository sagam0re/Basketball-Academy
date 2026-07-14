import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, MinLength, IsString } from "class-validator";

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