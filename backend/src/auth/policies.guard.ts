import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { PolicyHandler } from './policy-handler.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly $reflector: Reflector,
    private readonly $caslAbilityFactory: CaslAbilityFactory
  ) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const handlers = this.$reflector.get<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      ctx.getHandler()
    ) || [];

    const { user } = ctx.switchToHttp().getRequest();
    const ability = this.$caslAbilityFactory.createForUser(user);

    return handlers.every((handler) => {
      return this.execPolicyHandler(handler, ability);
    });
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility): boolean {
    if(typeof handler === 'function') {
      return handler(ability);
    }

    return handler.handle(ability);
  }
}
