// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class PortfoliosService {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}

  async createPortfolio(data: any) {
    return this.prisma.portfolio.create({
      data,
    });
  }

  async getAllPortfolios() {
    return this.prisma.portfolio.findMany({
      include: {
        projects: true,
        user: true,
      },
    });
  }
}
