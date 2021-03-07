import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';

import * as faker from 'faker';

function getAuthor(): {
  firstName: string;
  middleName: string;
  lastName: string;
  description: string;
} {
  return {
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    description: faker.lorem.paragraph()
  }
}

describe('AuthorsService', () => {
  let module: TestingModule;
  let service: AuthorsService;
  let database: PrismaService;

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method findAll', async () => {
    let authors = await database.author.create({ data: getAuthor() });
    await expect(service.findAll).toBeDefined();
    let all = await service.findAll({});
    await expect(all).toBeDefined();
    await expect(all.length).toBeGreaterThan(0);
    await database.author.delete({ where: { id: authors.id }});
  });

  it('should have a method findOne', async () => {
    const author = await database.author.create({ data: getAuthor() });
    await expect(service.findOne).toBeDefined();
    let one = await service.findOne({
      where: {
        id: author.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(author?.id);
    await database.author.delete({ where: { id: author.id }});
  });

  it('should create a new Author in the database', async () => {
    await expect(service.create).toBeDefined();
    let mock = await service.create(getAuthor());
    await expect(mock).toBeDefined();
    await expect(mock.id).toBeDefined();
    await expect(mock.createdAt).toBeDefined();
    await expect(mock.updatedAt).toBeDefined();
    await database.author.delete({ where: { id: mock.id }});
  });

  it('should update an Author in the database', async () => {
    await expect(service.update).toBeDefined();
    let mock = await database.author.create({ data: getAuthor() });
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
    let mock = await database.author.create({ data: getAuthor() });
    mock = await service.delete({ id: mock.id });
    await expect(service.findOne({where : { id: mock.id }})).rejects.toThrowError('The requested author could not be found');
  });
});
