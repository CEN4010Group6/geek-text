import { Prisma } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as argon2 from 'argon2';

describe('UsersController', () => {
  let controller: UsersController;
  let database: PrismaService;
  let utility: UtilityService;

  let mockUser: any = {
    email: 'a@b.com',
    firstName: 'Mock',
    middleName: 'M',
    lastName: 'McMockface',
    nickName: 'McMockface'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UsersService, UtilityService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    database = module.get<PrismaService>(PrismaService);
    utility = module.get<UtilityService>(UtilityService);

    const hash = await argon2.hash('IAmAPassword');
    mockUser.passwordHash = hash;

    let u;

    if(u = await database.user.findFirst({ where: { firstName: mockUser.firstName }})) {
      await database.user.delete({ where: { id: u.id }});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.UserSelect;
    const first = await database.user.findFirst();
    const cursor = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.UserWhereUniqueInput;
    const orderBy = await utility.convertOtoB({ firstName: 'asc' }) as unknown as Prisma.UserOrderByInput;
    const where = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.UserWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.UserSelect;
    await expect(controller.findOne).toBeDefined();
    const user = await database.review.findFirst();
    const findOne = await controller.findOne(user?.id as string, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    mockUser = await controller.create({
      email: 'a@b.com',
      password: 'IAmAPassword'
    });
    await expect(mockUser).toBeDefined();
    await expect(mockUser.email).toBe('a@b.com');
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    mockUser = await database.user.findFirst({ where: { id: mockUser.id }})
    mockUser.email = 'c@d.com';
    mockUser = await controller.update(mockUser.id, mockUser);
    await expect(mockUser).toBeDefined();
    await expect(mockUser.email).toBe('c@d.com');
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    await expect(mockUser).toBeDefined();
    mockUser = await database.user.findFirst({ where: { id: mockUser.id }});
    mockUser = await controller.delete(mockUser.id);
    const testBook = await controller.findOne(mockUser.id);
    expect(testBook).toBeNull();
  });
});
