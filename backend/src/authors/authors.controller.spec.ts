import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { UtilityService } from '../utility/utility.service';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';
import { Author, CreateAuthor, UpdateAuthor } from './dto/author';
import * as faker from 'faker';

function getAuthor(): CreateAuthor {
  return {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    description: faker.lorem.paragraph()
  }
}

describe('AuthorsController', () => {
  let module: TestingModule;
  let controller: AuthorsController;
  let database: PrismaService;

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
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  it('should be defined', async () => {
    await expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    let author = await database.author.create({ data: getAuthor() });
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
    const author = await controller.create(getAuthor() as CreateAuthor);
    const select = { id: true } as Prisma.AuthorSelect;
    await expect(controller.findOne).toBeDefined();
    const findOne = await controller.findOne(author.id, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    let mock = getAuthor() as CreateAuthor;
    mock = await controller.create(mock as CreateAuthor);
    await expect(mock).toBeDefined();
    await expect((mock as Author).id).toBeDefined();
    // @ts-ignore
    await expect(mock.createdAt).toBeDefined();
    // @ts-ignore
    await expect(mock.updatedAt).toBeDefined();
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    let mock: CreateAuthor | Author = getAuthor();
    mock = await controller.create(mock);
    mock.middleName = 'R';
    mock = await controller.update((mock as Author).id, mock);
    await expect(mock).toBeDefined();
    await expect((mock as Author).id).toBeDefined()
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    let mock = getAuthor() as CreateAuthor;
    mock = await controller.create(mock);
    expect((mock as Author).id).toBeDefined();
    mock = await controller.delete((mock as Author).id);
    await expect(controller.findOne((mock as Author).id)).rejects.toThrowError('The requested author could not be found');
  });
});
