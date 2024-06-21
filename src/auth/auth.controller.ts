import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/user/entities/users.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ): Promise<void> {
    const { access_token } = await this.authService.login(email, password);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });
    res.send({ message: 'Login successful' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<Users> {
    return await this.authService.register(user);
  }
}
