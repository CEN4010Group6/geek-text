import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        PrismaService
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
