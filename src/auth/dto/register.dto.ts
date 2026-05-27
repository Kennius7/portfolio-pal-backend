import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'portfolio@gmail.dev',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Password28!',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
