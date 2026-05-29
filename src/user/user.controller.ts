import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
// import { CurrentUserDto } from './dto/current_user.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import {
  ApiBearerAuth,
  // ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-current-user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  async getProfile(@Req() req: AuthenticatedRequest): Promise<{
    userId: string;
    email: string;
    fullName: string;
  }> {
    const user = await this.userService.getCurrentUser(req.user.userId);
    // const authHeader = req.headers.authorization;
    // const accessToken = authHeader ? authHeader.split(' ')[1] : '';

    return {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }

  @Get('get-all-users')
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<
    {
      userId: string;
      email: string;
      fullName: string;
      username: string;
      portfolio: Portfolio | null;
      createdAt: Date;
    }[]
  > {
    const users = await this.userService.getAllUsers();

    return users.map((user) => {
      return {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        portfolio: user.portfolio,
        createdAt: user.createdAt,
      };
    });
  }
}
