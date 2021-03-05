import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksService', () => {
  let module: TestingModule;
  let service: BooksService;
  let database: PrismaService;

  const mockBook: any = {
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
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  beforeEach(async () => {
    let b = await database.book.findFirst({ where: { title: mockBook.title }});

    if(b && b?.id) {
      await database.book.delete({ where: { id: b.id } });
    }

    b = await database.book.findUnique({ where: { isbn: mockBook.isbn }});

    if(b) {
      await database.book.delete({ where: { id: b.id }})
    }
  });

  afterEach(async () => {
    let b = await database.book.findFirst({ where: { title: mockBook.title }});

    if(b && b?.id) {
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

  it('should create a new Book in the database', async () => {
    await expect(service.create).toBeDefined();
    const mock = await service.create(mockBook);
    await expect(mock).toBeDefined();
    await expect(mock.id).toBeDefined();
    await expect(mock.title).toBe('Mock Book');
    await database.book.delete({ where: { id: mock.id }});
  });

  it('should update an Book in the database', async () => {
    await expect(service.update).toBeDefined();
    let mock = await database.book.create({ data: mockBook });
    mock.title = 'A Mocking Book'
    mock = await service.update({
      where: {
        id: mock.id
      },
      data: mock
    });
    expect(mock).toBeDefined();
    expect(mock.title).toBe('A Mocking Book');
    await database.book.delete({ where: { id: mock.id }});
  });

  it('should delete a Book from the database', async () => {
    await expect(service.delete).toBeDefined();
    let mock = await service.create(mockBook);
    mock = await service.delete({ id: mock.id });
    const noBook = await database.book.findFirst({where : { id: mock.id }});
    await expect(noBook).toBeNull();
  });
});
