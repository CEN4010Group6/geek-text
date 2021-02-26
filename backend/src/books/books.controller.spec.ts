import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { BooksController } from './books.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BooksService } from './books.service';
import { UtilityService } from '../utility/utility.service';

describe('BooksController', () => {
  let controller: BooksController;
  let database: PrismaService;
  let utility: UtilityService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        BooksService,
        UtilityService
      ],
      controllers: [ BooksController ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    utility = module.get<UtilityService>(UtilityService);
    database = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.AuthorSelect;
    const first = await database.author.findFirst();
    const cursor = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.AuthorWhereUniqueInput;
    const orderBy = await utility.convertOtoB({ firstName: 'asc' }) as unknown as Prisma.AuthorOrderByInput;
    const where = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.AuthorWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('should have a method create', () => {
    expect(controller.create).toBeDefined();
  });

  it('should have a method update', () => {
    expect(controller.update).toBeDefined();
  });

  it('should have a method delete', () => {
    expect(controller.delete).toBeDefined();
  });

  // it('should return an array when findAll is called', async () => {
  //   expect.assertions(1);
  //   await expect(controller.findAll({})).resolves.toEqual(expect.any(Object));
  // });
});
