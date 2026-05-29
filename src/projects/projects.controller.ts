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
import { ProjectService } from './projects.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('create')
  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  create(@Body() body: ProjectDto) {
    return this.projectService.createProject(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiOperation({ summary: 'Get a single project by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the project',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Project found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  findOne(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('portfolio/:portfolioId')
  @ApiOperation({ summary: 'Get all projects for a specific portfolio' })
  @ApiParam({
    name: 'portfolioId',
    description:
      'The unique ID of the portfolio whose projects you want to fetch',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Projects found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Projects not found',
  })
  findAllByPortfolio(@Param('portfolioId') portfolioId: string) {
    return this.projectService.getProjectsByPortfolioId(portfolioId);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectService.getAllProjects();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing project by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the project to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  update(@Param('id') id: string, @Body() body: Partial<ProjectDto>) {
    return this.projectService.updateProject(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the project to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  remove(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
