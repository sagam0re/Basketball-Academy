import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        description: 'First Name',
        example: 'John'
    })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        description: 'Last Name',
        example: 'Doe'
    })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty({
        description: 'Email',
        example: 'john.doe@mail.com'
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'Password',
        example: 'Pass@123'
    })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({
        description: 'Role',
        enum: Role
    })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
