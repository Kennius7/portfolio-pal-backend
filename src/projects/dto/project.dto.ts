import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    example: 'My First Project',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'It was a challenging and interesting project, and I enjoyed working on it.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1506748785331-ad25f4762cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    example: 'https://vercel.com/username/repo-name',
    required: false,
  })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiProperty({
    example: '2084c24f-9a4a-447f-a5d9-f802a65b6879',
    required: true,
  })
  @IsString()
  portfolioId: string;

  @ApiProperty({
    example: '2084-03-21T00:00:00.000Z',
    required: true,
  })
  @IsString()
  projectCreatedAt: Date;

  @ApiProperty({
    example: '2084-03-21T00:00:00.000Z',
    required: true,
  })
  @IsString()
  projectEndAt: string;
}
