import { Injectable, NotFoundException } from '@nestjs/common';
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
        portfolioId: data.portfolioId,
        projectCreatedAt: data.projectCreatedAt,
        projectEndAt: data.projectEndAt,
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
        portfolioId: true,
        projectCreatedAt: true,
        projectEndAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getProjectById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        liveUrl: true,
        portfolioId: true,
        projectCreatedAt: true,
        projectEndAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async getProjectsByPortfolioId(portfolioId: string) {
    // Optional: Verify if the portfolio actually exists first
    const portfolioExists = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!portfolioExists) {
      throw new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
    }

    // Fetch all projects matching the portfolioId
    return this.prisma.project.findMany({
      where: {
        portfolioId: portfolioId,
      },
      orderBy: {
        createdAt: 'desc', // Optional: Sorts projects so the newest ones appear first
      },
    });
  }

  async updateProject(id: string, data: Partial<ProjectDto>) {
    const exists = await this.prisma.project.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        liveUrl: data.liveUrl,
        projectCreatedAt: data.projectCreatedAt,
        projectEndAt: data.projectEndAt,
        portfolioId: data.portfolioId,
      },
    });
  }

  async deleteProject(id: string) {
    const exists = await this.prisma.project.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
