import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import * as argon2 from 'argon2';
import faker from 'faker';

describe('UsersService', () => {
  let module: TestingModule;
  let service: UsersService;
  let database: PrismaService;

  let mockUser: any = {
    email: faker.internet.exampleEmail(),
    passwordHash: '',
    firstName: 'Mock',
    middleName: 'M',
    lastName: 'McMockface',
    nickName: faker.name.title()
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        UsersService
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    database = module.get<PrismaService>(PrismaService);

    mockUser.passwordHash = await argon2.hash('IAmAPassword');
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  beforeEach(async () => {
    const u = await database.user.findFirst({ where: { email: mockUser.email }});

    if(u && u?.id) {
      await database.user.delete({ where: { id: u.id }});
    }
  });

  afterEach(async () => {
    const u = await database.user.findFirst({ where: { email: mockUser.email }});

    if(u && u?.id) {
      await database.user.delete({ where: { id: u.id } });
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const user = await database.user.create({ data: mockUser });
    await expect(service.findAll).toBeDefined();
    let all = await service.findAll({});
    await expect(all).toBeDefined();
    await expect(all.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    await database.user.create({ data: mockUser });
    const user = await database.user.findFirst();
    await expect(user?.id).toBeDefined();
    await expect(service.findOne).toBeDefined();
    const one = await service.findOne({
      where: {
        id: user?.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(user?.id);
  });

  it('should create a new User in the database', async () => {
    let mock = mockUser;
    await expect(service.create).toBeDefined();
    mock = await service.create({
      ...mock,
      password: 'asmdkflmsadkmlsa'
    });
    await expect(mock).toBeDefined();
    await expect(mock.id).toBeDefined();
  });

  it('should update an User in the database', async () => {
    await expect(service.update).toBeDefined();
    let mock = await database.user.create({ data: mockUser });
    const email = faker.internet.exampleEmail();
    mock.email = email;
    mock = await service.update({
      where: {
        id: mock.id
      },
      data: mock
    });
    expect(mock).toBeDefined();
    expect(mock.email).toBe(email);
    await database.user.delete({ where: { id: mock.id }});
  });

  it('should delete an User from the database', async () => {
    await expect(service.delete).toBeDefined();
    let mock = mockUser;
    mock = await database.user.create({ data: mock });
    mock = await database.user.findUnique({ where: { id: mock.id }});
    mock = await service.delete({ id: mock.id });
    const noUser = await service.findOne({where : { id: mock.id }});
    await expect(noUser).toBeNull();
  });
});
