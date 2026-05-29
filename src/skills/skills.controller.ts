import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkillsDto } from './dto/skills.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('create')
  @ApiOperation({ summary: 'Create skill' })
  @ApiResponse({
    status: 201,
    description: 'Skill created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  create(@Body() body: SkillsDto) {
    return this.skillsService.createSkill(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiOperation({ summary: 'Get a single skill by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the skill',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Skill found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Skill not found',
  })
  findOne(@Param('id') id: string) {
    return this.skillsService.getSkillById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('portfolio/:portfolioId')
  @ApiOperation({ summary: 'Get all skills for a specific portfolio' })
  @ApiParam({
    name: 'portfolioId',
    description:
      'The unique ID of the portfolio whose skills you want to fetch',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Skills found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Skills not found',
  })
  findAllByPortfolio(@Param('portfolioId') portfolioId: string) {
    return this.skillsService.getSkillsByPortfolioId(portfolioId);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get all skills' })
  findAll() {
    return this.skillsService.getAllSkills();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing skill by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the skill to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Skill updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Skill not found',
  })
  update(
    @Param('id') id: string,
    @Body() body: Partial<SkillsDto>, // Uses Partial so fields are optional in the update payload
  ) {
    return this.skillsService.updateSkill(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a skill by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the skill to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Skill deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Skill not found',
  })
  remove(@Param('id') id: string) {
    return this.skillsService.deleteSkill(id);
  }
}
