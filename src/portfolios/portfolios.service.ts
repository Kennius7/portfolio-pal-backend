import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PortfolioDto } from './dto/portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}

  async createPortfolio(data: PortfolioDto) {
    return this.prisma.portfolio.create({
      data: {
        title: data.title,
        theme: data.theme,
        tagline: data.tagline,
        greeting: data.greeting,
        bioShort: data.bioShort,
        bioLong: data.bioLong,
        whatsapp: data.whatsapp,
        email: data.email,
        avatarUrl: data.avatarUrl,
        resumeUrl: data.resumeUrl,
        userId: data.userId,
        skills: {
          create: [],
        },
        projects: {
          create: [],
        },
      },
      include: {
        skills: true,
        projects: true,
      },
    });
  }

  async getPortfolioById(id: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        theme: true,
        tagline: true,
        greeting: true,
        bioShort: true,
        bioLong: true,
        whatsapp: true,
        email: true,
        avatarUrl: true,
        resumeUrl: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    return portfolio;
  }

  async getAllPortfolios() {
    return this.prisma.portfolio.findMany({
      select: {
        id: true,
        title: true,
        theme: true,
        tagline: true,
        greeting: true,
        bioShort: true,
        bioLong: true,
        whatsapp: true,
        email: true,
        avatarUrl: true,
        resumeUrl: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updatePortfolio(id: string, data: Partial<PortfolioDto>) {
    // Optional: Check if portfolio exists first to throw a clean NestJS 404 error
    const exists = await this.prisma.portfolio.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    return this.prisma.portfolio.update({
      where: { id },
      data: {
        title: data.title,
        theme: data.theme,
        tagline: data.tagline,
        greeting: data.greeting,
        bioShort: data.bioShort,
        bioLong: data.bioLong,
        whatsapp: data.whatsapp,
        email: data.email,
        avatarUrl: data.avatarUrl,
        resumeUrl: data.resumeUrl,
      },
    });
  }

  async deletePortfolio(id: string) {
    const exists = await this.prisma.portfolio.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    return this.prisma.portfolio.delete({
      where: { id },
    });
  }
}
