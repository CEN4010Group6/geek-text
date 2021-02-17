import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GenresService } from './genres.service';

describe('GenresService', () => {
  let service: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        PrismaService
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
