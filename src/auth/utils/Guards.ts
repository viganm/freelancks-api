import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // The JWT validation logic should be handled by your JWT strategy
    // This guard just initiates the Google OAuth flow and delegates to the JWT strategy for validation
    return (await super.canActivate(context)) as boolean;
  }
}
