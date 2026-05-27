import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'My Developer Portfolio',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Frontend Engineer',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    example: 'dark',
    required: false,
  })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty({
    example: 'cm123456789',
  })
  @IsString()
  userId: string;
}
