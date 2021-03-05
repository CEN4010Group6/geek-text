import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import * as faker from 'faker';
import { BooksController } from './books.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BooksService } from './books.service';
import { UtilityService } from '../utility/utility.service';
import { CaslAbilityFactory } from '../auth/casl-ability.factory'

describe('BooksController', () => {
  let module: TestingModule;
  let controller: BooksController;
  let database: PrismaService;
  let utility: UtilityService;

  let mockBook: any;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        BooksService,
        UtilityService,
        CaslAbilityFactory
      ],
      controllers: [ BooksController ],
    })
      .compile();

    controller = module.get<BooksController>(BooksController);
    utility = module.get<UtilityService>(UtilityService);
    database = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  beforeEach(async () => {

    mockBook = {
      title: faker.commerce.productName(),
      publishYear: 2020,
      isbn: faker.random.number(),
      description: 'A book',
      price: 1.50,
      coverUrl: '',
      sold: 0,
      publisher: {
        connectOrCreate: {
          where: {
            name: 'A Mock Publisher'
          },
          create: {
            name: 'A Mock Publisher',
            city: '',
            state: ''
          }
        }
      }
    }

    const book = await database.book.findFirst({ where: { title: mockBook.title }});

    if(book && book?.id) {
      await database.book.delete({ where: { id: book.id }});
    }
  });

  afterEach(async () => {
    const book = await database.book.findFirst({ where: { title: mockBook.title }});

    if(book && book?.id) {
      await database.book.delete({ where: { id: book.id }});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const select = { id: true } as unknown as Prisma.AuthorSelect;
    const first = await database.book.findFirst();
    const cursor = { id: first?.id } as Prisma.BookWhereUniqueInput;
    const orderBy = { title: 'asc' } as Prisma.BookOrderByInput;
    const where = { id: first?.id } as Prisma.BookWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    const select = { id: true } as Prisma.BookSelect;
    await expect(controller.findOne).toBeDefined();
    const book = await database.book.findFirst();
    const findOne = await controller.findOne(book?.id as string, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    const mock = await controller.create(mockBook);
    await expect(mock).toBeDefined();
    await expect(mock.title).toBe(mockBook.title);
    await expect(mock.price).toBe(1.50);
    await expect(mock.publishYear).toBe(2020);
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    let mock = await database.book.create({ data: mockBook });
    mock.title = 'A Mocking Book';
    mock = await controller.update(mock.id, mock);
    await expect(mock).toBeDefined();
    await expect(mock.title).toBe('A Mocking Book');
    await database.book.delete({ where: { title: mock.title }});
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    let mock = await database.book.create({ data: mockBook });
    mock = await controller.delete(mock.id);
    const testBook = await database.book.findFirst({ where: { id: mock.id }});
    expect(testBook).toBeNull();
  });
});
