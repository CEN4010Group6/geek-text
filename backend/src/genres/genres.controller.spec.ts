import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

describe('GenresController', () => {
  let controller: GenresController;
  let utility: UtilityService;
  let database: PrismaService;

  let mockGenre: any = {
    name: 'Mockfiction'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        GenresService,
        UtilityService
      ],
      controllers: [ GenresController ],
    }).compile();

    controller = module.get<GenresController>(GenresController);
    utility = module.get<UtilityService>(UtilityService);
    database = module.get<PrismaService>(PrismaService);

    let g;

    if(g = await database.genre.findFirst({ where: { name: mockGenre.name }})) {
      await database.genre.delete({ where: { id: g.id }});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.GenreSelect;
    const first = await database.book.findFirst();
    const cursor = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.GenreWhereUniqueInput;
    const orderBy = await utility.convertOtoB({ title: 'asc' }) as unknown as Prisma.GenreOrderByInput;
    const where = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.GenreWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.GenreSelect;
    await expect(controller.findOne).toBeDefined();
    const genre = await database.genre.findFirst();
    const findOne = await controller.findOne(genre?.id as number, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    mockGenre = await controller.create(mockGenre);
    await expect(mockGenre).toBeDefined();
    await expect(mockGenre.name).toBe('Mockfiction');
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    mockGenre.name = 'Mocknonfiction'
    mockGenre = await controller.update(mockGenre.id, mockGenre);
    await expect(mockGenre).toBeDefined();
    await expect(mockGenre.title).toBe('Mocknotfiction');
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    await expect(mockGenre).toBeDefined();
    mockGenre = await controller.delete(mockGenre.id);
    const testBook = await controller.findOne(mockGenre.id);
    expect(testBook).toBeNull();
  });
});
