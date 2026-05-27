import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProjectService, PrismaService],
  controllers: [ProjectsController],
  // exports: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
