import { TestingModule, Test } from '@nestjs/testing';

import { LocalAuthGuard } from './local-auth.guard';

describe('RolesGuard', () => {
  let guard: LocalAuthGuard;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        LocalAuthGuard
      ]
    }).compile();

    guard = module.get<LocalAuthGuard>(LocalAuthGuard);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
    expect(guard.canActivate).toBeDefined();
    expect(guard.getAuthenticateOptions).toBeDefined();
    expect(guard.logIn).toBeDefined();
  });
});
