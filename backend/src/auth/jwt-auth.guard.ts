import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly $reflector: Reflector) {
    super();
  }

  /**
   * @inheritdoc
   */
  canActivate(ctx: ExecutionContext) {
    const isPublic = this.$reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(ctx);
  }
}
