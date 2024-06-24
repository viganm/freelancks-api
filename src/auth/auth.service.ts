import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Users } from 'src/user/entities/users.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOneForLogin(email, password);
      if (user.id && user.email) {
        const payload = { userId: user.id, userEmail: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new Error('Error validating password');
    }
  }

  async register(user: CreateUserDto): Promise<Users> {
    const newUser = await this.userService.create(user);
    return newUser;
  }

  async googleLogin(user: any): Promise<any> {
    let payload = {};
    const existingUser = await this.userService.findOneGoogle(
      user.id,
      user.emails[0].value,
    );
    if (existingUser) {
      if (existingUser.google_id === null) {
        await this.userService.update(existingUser.id, { google_id: user.id });
      } else if (existingUser.email === null) {
        await this.userService.update(existingUser.id, {
          email: user.emails[0].value,
        });
      }
      payload = { userId: existingUser.id, userEmail: existingUser.email };
    } else {
      const newUser = await this.userService.create({
        email: user.emails[0].value,
        google_id: user.id,
      });
      payload = { userId: newUser.id, userEmail: newUser.email };
    }
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
