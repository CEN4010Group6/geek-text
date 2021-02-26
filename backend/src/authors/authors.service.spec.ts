import { first } from 'rxjs/operators';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let database: PrismaService;

  let mockAuthor: any = {
    firstName: 'Mock',
    middleName: 'M',
    lastName: 'McMockface',
    description: 'Mock Mock Mock'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        PrismaService
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    database = module.get<PrismaService>(PrismaService);

    let m;

    if(m = await database.author.findFirst({ where: { firstName: mockAuthor.firstName }})) {
      await database.author.delete({where: { id: m.id }});
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
    let author = await database.author.findFirst();
    await expect(author?.id).toBeDefined();
    await expect(service.findOne).toBeDefined();
    let one = await service.findOne({
      where: {
        id: author?.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(author?.id);
  });

  it('should create a new Author in the database', async () => {
    await expect(service.create).toBeDefined();
    mockAuthor = await service.create(mockAuthor);
    await expect(mockAuthor).toBeDefined();
    await expect(mockAuthor.id).toBeDefined();
    await expect(mockAuthor.firstName).toBe('Mock');
    await expect(mockAuthor.middleName).toBe('M');
    await expect(mockAuthor.lastName).toBe('McMockface');
    await expect(mockAuthor.createdAt).toBeDefined();
    await expect(mockAuthor.updatedAt).toBeDefined();
  });

  it('should update an Author in the database', async () => {
    await expect(service.update).toBeDefined();
    mockAuthor.middleName = 'R'
    mockAuthor = await service.update({
      where: {
        id: mockAuthor.id
      },
      data: mockAuthor
    });
    expect(mockAuthor).toBeDefined();
    expect(mockAuthor.middleName).toBe('R');
  });

  it('should delete an Author from the database', async () => {
    await expect(service.delete).toBeDefined();
    mockAuthor = await service.delete({ id: mockAuthor.id });
    const noAuthor = await service.findOne({where : { id: mockAuthor.id }});
    await expect(noAuthor).toBeNull();
  });
});
