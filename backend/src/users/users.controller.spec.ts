import { Prisma } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as argon2 from 'argon2';
import faker from 'faker';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';

describe('UsersController', () => {
  let module: TestingModule;
  let controller: UsersController;
  let database: PrismaService;

  let mockUser: any = {
    email: 'a@b.com',
    passwordHash: '',
    firstName: 'Mock',
    middleName: 'M',
    lastName: 'McMockface',
    nickName: faker.name.jobArea()
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        UsersService,
        UtilityService,
        CaslAbilityFactory
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    database = module.get<PrismaService>(PrismaService);

    mockUser.passwordHash = await argon2.hash('IAmAPassword');

    let u = await database.user.findFirst({ where: { email: mockUser.email }});

    if(u && u?.id) {
      await database.user.delete({ where: { id: u.id }});
    }
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  beforeEach(async () => {
    let u = await database.user.findFirst({ where: { email: mockUser.email }});

    if(u && u?.id) {
      await database.user.delete({ where: { id: u.id }});
    }
  });

  afterEach(async () => {
    let u = await database.user.findFirst({ where: { email: mockUser.email }});

    if(u && u?.id) {
      await database.user.delete({ where: { id: u.id }});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const select = { id: true } as Prisma.UserSelect;
    const first = await database.user.create({ data: mockUser });
    const cursor = { id: first?.id } as Prisma.UserWhereUniqueInput;
    const orderBy = { firstName: 'asc' } as Prisma.UserOrderByInput;
    const where = { id: first?.id } as Prisma.UserWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    const select = { id: true } as Prisma.UserSelect;
    await expect(controller.findOne).toBeDefined();
    const user = await database.user.create({ data: mockUser });
    const findOne = await controller.findOne(user?.id as string, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    let mock = mockUser;
    const user = await controller.create({
      ...mock,
      password: 'lafsdkasdlmflsda'
    });
    await expect(user).toBeDefined();
    await expect(user.email).toBe(mockUser.email);
    await database.user.delete({
      where: {
        id: user.id
      }
    });
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    let mock = mockUser;
    let user = await controller.create({
      ...mock,
      password: 'lamlksdfklam'
    });
    user.email = 'cdefg@d.com';
    user = await controller.update(user.id, user);
    await expect(user).toBeDefined();
    await expect(user.email).toBe('cdefg@d.com');
    await database.user.delete({ where: { id: user.id }});
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    let user = await database.user.create({ data: mockUser });
    user = await controller.delete(user.id);
    const testUser = await controller.findOne(user.id);
    expect(testUser).toBeNull();
  });
});
