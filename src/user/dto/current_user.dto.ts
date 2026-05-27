import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CurrentUserDto {
  @ApiProperty({
    example: 'cm123456789',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'portfolio@gmail.dev',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}
