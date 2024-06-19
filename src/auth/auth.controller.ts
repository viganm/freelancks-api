import { Controller, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/user/entities/users.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email')
    email: string,
    @Body('password')
    password: string,
  ): Promise<{ access_token: string }> {
    return this.authService.login(email, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<Users> {
    return await this.authService.register(user);
  }
}
