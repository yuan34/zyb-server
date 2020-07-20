import { createHmac } from 'crypto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';
import { LoginPayload } from '../../modules/auth/login.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginPayload): Promise<any> {
    const user = await this.usersService.findOne(username);
    const passHash = createHmac('sha256', password).digest('hex');
    if (user && user.password === passHash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      statusCode: HttpStatus.OK,
      message: '登录成功',
      data: {
        access_token: this.jwtService.sign({ ...user }),
      },
    };
  }
}
