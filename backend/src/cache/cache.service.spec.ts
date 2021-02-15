import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';

import 'dotenv/config';

describe('CacheService', () => {
  let service: CacheService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
