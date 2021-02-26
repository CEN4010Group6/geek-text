import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksService', () => {
  let service: BooksService;
  let database: PrismaService;

  let mockBook: any = {
    title: 'Mock Book',
    publishYear: 2020,
    isbn: 8675309,
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

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BooksService,
        PrismaService
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    database = module.get<PrismaService>(PrismaService);

    let b;

    if(b = await database.book.findFirst({ where: { title: mockBook.title } })) {
      await database.book.delete({ where: { id: b.id } });
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
    let book = await database.book.findFirst();
    await expect(book?.id).toBeDefined();
    await expect(service.findOne).toBeDefined();
    let one = await service.findOne({
      where: {
        id: book?.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(book?.id);
  });

  it('should create a new Author in the database', async () => {
    await expect(service.create).toBeDefined();
    mockBook = await service.create(mockBook);
    await expect(mockBook).toBeDefined();
    await expect(mockBook.id).toBeDefined();
    await expect(mockBook.title).toBe('Mock Book');
  });

  it('should update an Author in the database', async () => {
    await expect(service.update).toBeDefined();
    mockBook = await database.book.findFirst({ where: { title: 'Mock Book' }});
    mockBook.title = 'A Mocking Book'
    mockBook = await service.update({
      where: {
        id: mockBook.id
      },
      data: mockBook
    });
    expect(mockBook).toBeDefined();
    expect(mockBook.title).toBe('A Mocking Book');
  });

  it('should delete an Author from the database', async () => {
    await expect(service.delete).toBeDefined();
    mockBook = await database.book.findFirst({ where: { title: mockBook.title }})
    mockBook = await service.delete({ id: mockBook.id });
    const noBook = await service.findOne({where : { id: mockBook.id }});
    await expect(noBook).toBeNull();
  });
});
