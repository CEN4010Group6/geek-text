import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PoliciesGuard } from './policies.guard';

describe('PoliciesGuard', () => {
  let guard: PoliciesGuard;
  let module: TestingModule;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        Reflector,
        CaslAbilityFactory,
        PoliciesGuard
      ]
    })
      .compile();

    guard = module.get<PoliciesGuard>(PoliciesGuard);
  });

  afterAll(async() => {
    await module.close();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
