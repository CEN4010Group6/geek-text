import { TestingModule, Test } from '@nestjs/testing';

import { JwtAuthGuard } from './jwt-auth.guard';

describe('RolesGuard', () => {

  let guard: JwtAuthGuard;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard
      ]
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
