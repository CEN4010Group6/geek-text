import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GenresService } from './genres.service';

describe('GenresService', () => {
  let service: GenresService;
  let database: PrismaService;

  let mockGenre: any = {
    name: 'Mockfiction'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        PrismaService
      ],
    }).compile();
    service = module.get<GenresService>(GenresService);
    database = module.get<PrismaService>(PrismaService);

    let g;

    if(g = await database.genre.findFirst({ where: { name: mockGenre.name } })) {
      await database.genre.delete({ where: { id: g.id } });
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method findAll', async () => {
    await expect(service.findAll).toBeDefined();
    let all = await service.findAll({});
    await expect(all).toBeDefined();
    await expect(all.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    let genre = await database.genre.findFirst();
    await expect(genre?.id).toBeDefined();
    await expect(service.findOne).toBeDefined();
    let one = await service.findOne({
      where: {
        id: genre?.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(genre?.id);
  });

  it('should create a new Author in the database', async () => {
    await expect(service.create).toBeDefined();
    mockGenre = await service.create(mockGenre);
    await expect(mockGenre).toBeDefined();
    await expect(mockGenre.id).toBeDefined();
    await expect(mockGenre.name).toBe('Mockfiction');
  });

  it('should update an Author in the database', async () => {
    await expect(service.update).toBeDefined();
    mockGenre.name = 'Mocknonfiction'
    mockGenre = await service.update({
      where: {
        id: mockGenre.id
      },
      data: mockGenre
    });
    expect(mockGenre).toBeDefined();
    expect(mockGenre.name).toBe('Mocknonfiction');
  });

  it('should delete an Author from the database', async () => {
    await expect(service.delete).toBeDefined();
    mockGenre = await service.delete({ id: mockGenre.id });
    const noBook = await service.findOne({where : { id: mockGenre.id }});
    await expect(noBook).toBeNull();
  });
});
