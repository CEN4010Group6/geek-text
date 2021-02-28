import { CanActivate } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';

import { RolesGuard } from './roles.guard';
import { Role, ROLES_KEY } from '../roles.decorator';
import { NestApplication } from '@nestjs/core';
import { request } from 'express';

describe('RolesGuard', () => {

  let guard: RolesGuard;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard
      ]
    })
      .compile();

    guard = module.get<RolesGuard>(RolesGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
    expect(guard.canActivate).toBeDefined();
  });

  it('should deny access to a protected resource', async () => {

  });
});
