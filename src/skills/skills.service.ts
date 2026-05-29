import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillsDto } from './dto/skills.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async createSkill(data: SkillsDto) {
    return this.prisma.skill.create({
      data: {
        name: data.name,
        description: data.description,
        level: data.level,
        imageUrl: data.imageUrl,
        portfolioId: data.portfolioId,
        category: data.category,
      },
    });
  }

  async getSkillById(id: string) {
    const skill = await this.prisma.skill.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        level: true,
        imageUrl: true,
        portfolioId: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return skill;
  }

  async getSkillsByPortfolioId(portfolioId: string) {
    // Optional: Verify if the portfolio actually exists first
    const portfolioExists = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!portfolioExists) {
      throw new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
    }

    // Fetch all skills matching the portfolioId
    return this.prisma.skill.findMany({
      where: {
        portfolioId: portfolioId,
      },
      orderBy: {
        createdAt: 'desc', // Optional: Sorts skills so the newest ones appear first
      },
    });
  }

  async getAllSkills() {
    return this.prisma.skill.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        level: true,
        imageUrl: true,
        portfolioId: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateSkill(id: string, data: Partial<SkillsDto>) {
    const exists = await this.prisma.skill.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return this.prisma.skill.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        level: data.level,
        imageUrl: data.imageUrl,
        portfolioId: data.portfolioId,
        category: data.category,
      },
    });
  }

  async deleteSkill(id: string) {
    const exists = await this.prisma.skill.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return this.prisma.skill.delete({
      where: { id },
    });
  }
}
