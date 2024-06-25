import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // The JWT validation logic should be handled by your JWT strategy
    // This guard just initiates the Google OAuth flow and delegates to the JWT strategy for validation
    return (await super.canActivate(context)) as boolean;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const { cookies } = context.switchToHttp().getRequest();
    const token = cookies['access_token'];
    const decodedToken = this.jwtService.decode(token);
    const currentRole = [decodedToken?.role];
    return requiredRoles.some((role) => currentRole?.includes(role));
  }
}
