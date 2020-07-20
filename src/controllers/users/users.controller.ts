import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  @Get('profile')
  @Roles('user', 'admin')
  getProfile(@Request() req) {
    return req.user;
  }
}
