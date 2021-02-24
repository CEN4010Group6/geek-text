import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role, ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * Roles Guard constructor
   *
   * @param $reflector
   */
  constructor(
    private readonly $reflector: Reflector
  ){}
  /** @inheritdoc */
  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.$reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();

    return requiredRoles.some((role) => {
      return user.roles.some((elem) => {
        return (elem.name.toLowerCase() === role);
      });
    });
  }
}
