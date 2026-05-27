import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PortfoliosService, PrismaService],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}
