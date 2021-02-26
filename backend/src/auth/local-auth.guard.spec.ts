import { TestingModule, Test } from '@nestjs/testing';

import { LocalAuthGuard } from './local-auth.guard';

describe('RolesGuard', () => {

  let guard: LocalAuthGuard;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalAuthGuard
      ]
    }).compile();

    guard = module.get<LocalAuthGuard>(LocalAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
    expect(guard.canActivate).toBeDefined();
    expect(guard.getAuthenticateOptions).toBeDefined();
    expect(guard.logIn).toBeDefined();
  });
});
