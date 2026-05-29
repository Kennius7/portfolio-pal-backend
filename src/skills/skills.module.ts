import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SkillsService, PrismaService],
  controllers: [SkillsController],
})
export class SkillsModule {}
