import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'giorgi.janelidze97@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '1qaz!QAZ',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
