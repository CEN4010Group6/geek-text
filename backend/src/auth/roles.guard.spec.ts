import { TestingModule, Test } from '@nestjs/testing';

import { RolesGuard } from './roles.guard';
import { Role, ROLES_KEY } from '../roles.decorator';

describe('RolesGuard', () => {

  let guard: RolesGuard;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard
      ]
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
