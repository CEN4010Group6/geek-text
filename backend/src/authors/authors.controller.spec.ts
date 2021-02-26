import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { UtilityService } from '../utility/utility.service';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let database: PrismaService;
  let utility: UtilityService;

  let mockAuthor: any = {
    firstName: 'Mock',
    middleName: 'M',
    lastName: 'McMockface',
    description: 'Mock Mock Mock'
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        AuthorsService,
        UtilityService
      ],
      controllers: [ AuthorsController ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    database = module.get<PrismaService>(PrismaService);
    utility = module.get<UtilityService>(UtilityService);

    let m = await database.author.findFirst({
      where: {
        firstName: mockAuthor.firstName,
        middleName: mockAuthor.middleName,
        lastName: mockAuthor.lastName
      }
   });

    if(m) {
      await database.author.delete({
        where: {
          id: m.id
        }
      });
    };
  });

  it('should be defined', async () => {
    await expect(controller).toBeDefined();
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

  it('should have a method findOne', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.AuthorSelect;
    await expect(controller.findOne).toBeDefined();
    const user = await database.user.findFirst();
    const findOne = await controller.findOne(user?.id as string, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    mockAuthor = await controller.create(mockAuthor);
    await expect(mockAuthor).toBeDefined();
    await expect(mockAuthor.id).toBeDefined();
    await expect(mockAuthor.firstName).toBe('Mock');
    await expect(mockAuthor.middleName).toBe('M');
    await expect(mockAuthor.lastName).toBe('McMockface');
    await expect(mockAuthor.createdAt).toBeDefined();
    await expect(mockAuthor.updatedAt).toBeDefined();
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    mockAuthor.middleName = 'R';
    mockAuthor = await controller.update(mockAuthor.id, mockAuthor);
    await expect(mockAuthor).toBeDefined();
    await expect(mockAuthor.firstName).toBe('Mock');
    await expect(mockAuthor.middleName).toBe('R');
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    mockAuthor = await controller.delete(mockAuthor.id);
    let testAuthor = await controller.findOne(mockAuthor.id);
    expect(testAuthor).toBeNull();
  });
});
