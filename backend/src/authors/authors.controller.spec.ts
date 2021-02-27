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

  const mockAuthor: any = {
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

    let a = await database.author.findFirst({where: { firstName: mockAuthor.firstName }});

    if(a?.id) {
      await database.author.delete({ where: { id: a.id }});
    }
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
    let mock = mockAuthor;
    mock = await controller.create(mock);
    await expect(mock).toBeDefined();
    await expect(mock.id).toBeDefined();
    await expect(mock.firstName).toBe('Mock');
    await expect(mock.middleName).toBe('M');
    await expect(mock.lastName).toBe('McMockface');
    await expect(mock.createdAt).toBeDefined();
    await expect(mock.updatedAt).toBeDefined();
    await database.author.delete({ where: { id: mock.id }});
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    let mock = mockAuthor;
    mock = await database.author.create({ data: { ...mock }});
    mock.middleName = 'R';
    mock = await controller.update(mock.id, mock);
    await expect(mock).toBeDefined();
    await expect(mock.firstName).toBe('Mock');
    await expect(mock.middleName).toBe('R');
    await database.author.delete({where: { id: mock.id }});
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    let mock = mockAuthor;
    mock = await database.author.create({ data: { ...mock }});
    expect(mock.id).toBeDefined();
    mock = await controller.delete(mock.id);
    const testAuthor = await controller.findOne(mock.id);
    expect(testAuthor).toBeNull();
  });
});
