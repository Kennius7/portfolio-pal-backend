import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create project' })
  create(@Body() body: ProjectDto) {
    return this.projectService.createProject(body);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectService.getAllProjects();
  }
}
