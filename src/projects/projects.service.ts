import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(data: ProjectDto) {
    return this.prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        portfolioId: data.portfolioId,
      },
    });
  }

  async getAllProjects() {
    return this.prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        liveUrl: true,
        githubUrl: true,
        portfolioId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
