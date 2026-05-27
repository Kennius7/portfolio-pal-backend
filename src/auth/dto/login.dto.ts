import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'portfolio@gmail.dev',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password28!',
  })
  @IsString()
  password: string;
}
