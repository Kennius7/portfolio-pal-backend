import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}

  async createPortfolio(data: CreatePortfolioDto) {
    return this.prisma.portfolio.create({
      data: {
        title: data.title,
        bio: data.bio,
        theme: data.theme,
        userId: data.userId,
      },
    });
  }

  async getAllPortfolios() {
    return this.prisma.portfolio.findMany({
      select: {
        id: true,
        title: true,
        bio: true,
        theme: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
