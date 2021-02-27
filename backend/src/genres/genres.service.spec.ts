import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GenresService } from './genres.service';

describe('GenresService', () => {
  let service: GenresService;
  let database: PrismaService;

  const mockGenre: any = {
    name: 'Mockfiction'
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        PrismaService
      ],
    }).compile();
    service = module.get<GenresService>(GenresService);
    database = module.get<PrismaService>(PrismaService);

    let g = await database.genre.findFirst({ where: { name: mockGenre.name } });

    if(g?.id) {
      await database.genre.delete({ where: { id: g.id } });
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method findAll', async () => {
    await expect(service.findAll).toBeDefined();
    const all = await service.findAll({});
    await expect(all).toBeDefined();
    await expect(all.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    const genre = await database.genre.create({ data: mockGenre });
    await expect(genre?.id).toBeDefined();
    await expect(service.findOne).toBeDefined();
    let one = await service.findOne({
      where: {
        id: genre?.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(genre?.id);
    await database.genre.delete({ where: { id: genre.id }});
  });

  it('should create a new Genre in the database', async () => {
    await expect(service.create).toBeDefined();
    const genre = await service.create(mockGenre);
    await expect(genre).toBeDefined();
    await expect(genre.id).toBeDefined();
    await expect(genre.name).toBe('Mockfiction');
    if(genre.id) {
      await database.genre.delete({ where: { id: genre.id }});
    }
  });

  it('should update an Genre in the database', async () => {
    await expect(service.update).toBeDefined();
    let mock = await database.genre.create({ data: mockGenre});
    mock.name = 'Mocknonfiction'
    mock = await service.update({
      where: {
        id: mock.id
      },
      data: mock
    });
    expect(mock).toBeDefined();
    expect(mock.name).toBe('Mocknonfiction');
    await database.genre.delete({ where: { id: mock.id }});
  });

  it('should delete an Genre from the database', async () => {
    await expect(service.delete).toBeDefined();
    let mock = await database.genre.create({ data: mockGenre });
    mock = await service.delete({ id: mock.id });
    const noGenre = await service.findOne({where : { id: mock.id }});
    await expect(noGenre).toBeNull();
  });
});
