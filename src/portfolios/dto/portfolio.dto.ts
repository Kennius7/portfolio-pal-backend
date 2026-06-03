import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PortfolioDto {
  @ApiProperty({
    example: 'My Developer Portfolio',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'dark',
    required: false,
  })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty({
    example: "I'm a Frontend Engineer",
    required: false,
  })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiProperty({
    example: "Hello, I'm John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  greeting?: string;

  @ApiProperty({
    example: 'Creative developer focused on React, Three.js, and sleek UI/UX.',
    required: false,
  })
  @IsOptional()
  @IsString()
  bioShort?: string;

  @ApiProperty({
    example:
      'I am a self-taught creative developer with over 5 years of experience. I bridge the gap between complex engineering and beautiful design, working primarily with WebGL and modern frontend frameworks to create unforgettable digital experiences.',
    required: false,
  })
  @IsOptional()
  @IsString()
  bioLong?: string;

  @ApiProperty({
    example: '+2348012345678',
    required: false,
  })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiProperty({
    example: 'johndoe@portfoliopal.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    example: 'https://example.com/resume.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiProperty({
    example: 'johndoe-dev',
    required: true,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'false',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty({
    required: true,
  })
  @IsString()
  userId: string;
}
