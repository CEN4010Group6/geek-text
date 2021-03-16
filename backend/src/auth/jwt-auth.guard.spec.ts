import { TestingModule, Test } from '@nestjs/testing';

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

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
    expect(guard.canActivate).toBeDefined();
    expect(guard.getAuthenticateOptions).toBeDefined();
    expect(guard.handleRequest).toBeDefined();
    expect(guard.logIn).toBeDefined();
  });
});
