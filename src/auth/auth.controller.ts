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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './utils/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { access_token } = await this.authService.login(loginDto);
    // Save access token in Authorization header
    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.send({ access_token });
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Register' })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<Users> {
    return await this.authService.register(user);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Google Login' })
  @ApiResponse({ status: 200, description: 'Google Login' })
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Google Login Redirect' })
  @ApiResponse({ status: 200, description: 'Google Login Redirect' })
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
