// import { Controller } from '@nestjs/common';

// @Controller('user')
// export class UserController {}

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUserDto } from './dto/current_user.dto';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('get_current_user')
  getProfile(@Req() req: CurrentUserDto) {
    return {
      userId: req.userId,
      email: req.email,
      fullName: req.fullName,
      accessToken: req.accessToken,
      refreshToken: req.refreshToken,
    };
  }
}
