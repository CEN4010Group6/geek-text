import { TestingModule, Test } from '@nestjs/testing';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './jwt-auth.guard';

describe('RolesGuard', () => {

  let guard: JwtAuthGuard;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
    expect(guard.canActivate).toBeDefined();
    expect(guard.getAuthenticateOptions).toBeDefined();
    expect(guard.handleRequest).toBeDefined();
    expect(guard.logIn).toBeDefined();
  });
});
