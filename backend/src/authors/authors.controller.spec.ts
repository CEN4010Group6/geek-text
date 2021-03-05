import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { UtilityService } from '../utility/utility.service';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';

describe('AuthorsController', () => {
  let module: TestingModule;
  let controller: AuthorsController;
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
        PrismaService,
        AuthorsService,
        UtilityService,
        CaslAbilityFactory
      ],
      controllers: [ AuthorsController ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    database = module.get<PrismaService>(PrismaService);

    let oldAuthor = await database.author.findUnique({
      where: {
        firstName_middleName_lastName: {
          firstName: mockAuthor.firstName,
          middleName: mockAuthor.middleName,
          lastName: mockAuthor.lastName
        }
      }
    });

    if(oldAuthor) {
      await database.author.delete({
        where: {
          firstName_middleName_lastName: {
            firstName: mockAuthor.firstName,
            middleName: mockAuthor.middleName,
            lastName: mockAuthor.lastName
          }
        }
      });
    }
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  beforeEach(async () => {
    let a: any = await database.author.findUnique({
      where: {
        firstName_middleName_lastName: {
          firstName: mockAuthor.firstName,
          middleName: mockAuthor.middleName,
          lastName: mockAuthor.lastName
        }
      }
    });

    if(a) {
      await database.author.delete({ where: { id: a.id }});
    }

    a = await database.author.findFirst({
      where: {
        firstName: mockAuthor.firstName,
        middleName: mockAuthor.middleName,
        lastName: mockAuthor.lastName
      }
    });

    if(a) {
      await database.author.delete({ where: { id: a.id }});
    }
  })

  afterEach(async () => {
    const a: any = await database.author.findUnique({
      where: {
        firstName_middleName_lastName: {
          firstName: mockAuthor.firstName,
          middleName: mockAuthor.middleName,
          lastName: mockAuthor.lastName
        }
      }
    });

    if(a && a?.id) {
      await database.author.delete({ where: { id: a.id }})
    }
  });

  it('should be defined', async () => {
    await expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    let author = await database.author.create({ data: mockAuthor });
    const select = { id: true } as Prisma.AuthorSelect;
    const first = author;
    const cursor = { id: first?.id } as Prisma.AuthorWhereUniqueInput;
    const orderBy = { firstName: 'asc' } as Prisma.AuthorOrderByInput;
    const where = { id: first?.id } as Prisma.AuthorWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThanOrEqual(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThanOrEqual(0);
  });

  it('should have a method findOne', async () => {
    const author = await controller.create(mockAuthor);
    const select = { id: true } as Prisma.AuthorSelect;
    await expect(controller.findOne).toBeDefined();
    const findOne = await controller.findOne(author.id, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    let mock = mockAuthor;
    mock = await controller.create(mock);
    await expect(mock).toBeDefined();
    await expect(mock.id).toBeDefined();
    await expect(mock.firstName).toBe('Mock');
    await expect(mock.middleName).toBe('M');
    await expect(mock.lastName).toBe('McMockface');
    await expect(mock.createdAt).toBeDefined();
    await expect(mock.updatedAt).toBeDefined();
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    let mock = mockAuthor;
    mock = await controller.create(mock);
    mock.middleName = 'R';
    mock = await controller.update(mock.id, mock);
    await expect(mock).toBeDefined();
    await expect(mock.firstName).toBe('Mock');
    await expect(mock.middleName).toBe('R');
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    let mock = mockAuthor;
    mock = await controller.create(mock);
    expect(mock.id).toBeDefined();
    mock = await controller.delete(mock.id);
    await expect(controller.findOne(mock.id)).rejects.toThrowError('The requested author could not be found');
  });
});
