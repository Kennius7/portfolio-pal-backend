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
import { PortfoliosService } from './portfolios.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PortfolioDto } from './dto/portfolio.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Portfolios')
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('create')
  @ApiOperation({ summary: 'Create portfolio' })
  @ApiResponse({
    status: 201,
    description: 'Portfolio created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  create(@Body() body: PortfolioDto) {
    return this.portfoliosService.createPortfolio(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiOperation({ summary: 'Get a single portfolio by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the portfolio',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Portfolio found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Portfolio not found',
  })
  findOne(@Param('id') id: string) {
    return this.portfoliosService.getPortfolioById(id);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get all portfolios' })
  findAll() {
    return this.portfoliosService.getAllPortfolios();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing portfolio by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the portfolio to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Portfolio updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Portfolio not found',
  })
  update(
    @Param('id') id: string,
    @Body() body: Partial<PortfolioDto>, // Uses Partial so fields are optional in the update payload
  ) {
    return this.portfoliosService.updatePortfolio(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a portfolio by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the portfolio to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Portfolio deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Portfolio not found',
  })
  remove(@Param('id') id: string) {
    return this.portfoliosService.deletePortfolio(id);
  }

  @Get('public/:slug')
  @ApiOperation({ summary: 'Get a single portfolio by slug' })
  @ApiParam({
    name: 'slug',
    description: 'The unique slug of the portfolio',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Portfolio fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Portfolio not found',
  })
  findPublished(@Param('slug') slug: string) {
    return this.portfoliosService.findPublishedPortfolio(slug);
  }
}
