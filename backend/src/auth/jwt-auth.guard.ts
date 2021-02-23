import { Observable } from 'rxjs';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * JWT Auth Guard constructor
   *
   * @param $reflector
   */
  constructor(
    private readonly $reflector: Reflector
  ) {
    super();
  }

  // /** @inheritdoc */
  public canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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
