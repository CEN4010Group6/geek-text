import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthorsService', () => {
  let module: TestingModule;
  let service: AuthorsService;
  let database: PrismaService;

  const mockAuthor: any = {
    firstName: 'Mock',
    middleName: 'M',
    lastName: 'McMockface',
    description: 'Mock Mock Mock'
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthorsService,
        PrismaService
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    database = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  beforeEach(async () => {

    let a = await database.author.findFirst({ where: { firstName: mockAuthor.firstName }});

    if(a && a?.id) {
      await database.author.delete({ where: { id: a.id }});
    }
  });

  afterEach(async () => {
    let a = await database.author.findFirst({ where: { firstName: mockAuthor.firstname }});

    if(a && a?.id) {
      await database.author.delete({ where: { id: a.id } });
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method findAll', async () => {
    await database.author.create({ data: mockAuthor });
    await expect(service.findAll).toBeDefined();
    let all = await service.findAll({});
    await expect(all).toBeDefined();
    await expect(all.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    const author = await database.author.create({ data: mockAuthor });
    await expect(service.findOne).toBeDefined();
    let one = await service.findOne({
      where: {
        id: author.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(author?.id);
  });

  it('should create a new Author in the database', async () => {
    await expect(service.create).toBeDefined();
    let mock = await service.create(mockAuthor);
    await expect(mock).toBeDefined();
    await expect(mock.id).toBeDefined();
    await expect(mock.firstName).toBe('Mock');
    await expect(mock.middleName).toBe('M');
    await expect(mock.lastName).toBe('McMockface');
    await expect(mock.createdAt).toBeDefined();
    await expect(mock.updatedAt).toBeDefined();
  });

  it('should update an Author in the database', async () => {
    await expect(service.update).toBeDefined();
    let mock = await database.author.create({ data: { ...mockAuthor }});
    mock.middleName = 'R'
    mock = await service.update({
      where: {
        id: mock.id
      },
      data: mock
    });
    await expect(mock).toBeDefined();
    await expect(mock.middleName).toBe('R');
    await database.author.delete({ where: { id: mock.id }});
  });

  it('should delete an Author from the database', async () => {
    await expect(service.delete).toBeDefined();
    let mock = await database.author.create({ data: mockAuthor });
    mock = await service.delete({ id: mock.id });
    await expect(service.findOne({where : { id: mock.id }})).rejects.toThrowError('The requested author could not be found');
  });
});
