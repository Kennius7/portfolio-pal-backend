import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { SkillCategory } from '@prisma/client';

export class SkillsDto {
  @ApiProperty({
    example: 'React Developer',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'A front end web development skill',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 50,
    description: 'The percentage level of proficiency in this skill',
    required: true,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  level: number;

  @ApiProperty({
    example: 'https://example.com/react.png',
    description: 'The image url for this skill',
    required: true,
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    enum: SkillCategory,
    description: 'The industry sector or type for this skill',
    required: true,
  })
  @IsEnum(SkillCategory)
  category: SkillCategory;

  @ApiProperty({
    required: true,
  })
  @IsString()
  portfolioId: string;
}
