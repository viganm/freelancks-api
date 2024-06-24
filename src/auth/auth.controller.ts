import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/user/entities/users.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express';
import { GoogleAuthGuard } from './utils/Guards';

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

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Res() res: Response, @Req() req) {
    const { access_token } = await this.authService.googleLogin(req.user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });
    res.redirect('http://localhost:3000');
    return { msg: 'OK' };
  }
}
