import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'First Name',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Email',
    example: 'john.doe@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'Pass@123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Role',
    enum: Role,
    isArray: true,
  })
  @IsArray()
  @IsEnum(Role, { each: true })
  role: Role[];
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'First Name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Email',
    example: 'john.doe@mail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Password',
    example: 'Pass@123',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Role',
    enum: Role,
    isArray: true,
  })
  @IsArray()
  @IsEnum(Role, { each: true })
  @IsOptional()
  role?: Role[];
}
