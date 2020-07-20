import {
  Controller,
  Body,
  Post,
  UseGuards,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../services/auth/auth.service';
import { LoginPayload } from '../../modules/auth/login.payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @UseGuards(AuthGuard())
  async login(@Body() credentials: LoginPayload) {
    const user = await this.authService.validateUser(credentials);
    if (user === null) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '用户名或密码错误',
      };
    }
    return await this.authService.login(user);
  }
}
