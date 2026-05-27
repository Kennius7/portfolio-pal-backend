// import { Controller } from '@nestjs/common';

// @Controller('portfolios')
// export class PortfoliosController {}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@ApiTags('Portfolios')
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  @ApiOperation({ summary: 'Create portfolio' })
  create(@Body() body: CreatePortfolioDto) {
    return this.portfoliosService.createPortfolio(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all portfolios' })
  findAll() {
    return this.portfoliosService.getAllPortfolios();
  }
}
