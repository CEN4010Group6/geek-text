import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  public canActivate(ctx: ExecutionContext) {
    return super.canActivate(ctx);
  }
}
