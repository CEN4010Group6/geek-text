import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let module: TestingModule;
  let service: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ PrismaService ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);

    service.onModuleInit = jest.fn(async () => await service.$connect());
    service.onModuleDestroy = jest.fn(async () => await service.$disconnect() );

    await module.init();
  });

  afterAll(async () => {
    await service.$disconnect();
    await module.close()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(PrismaService);
    expect(service).toBeInstanceOf(PrismaClient);

    expect(service.onModuleDestroy).toBeDefined();
    expect(service.onModuleInit).toBeDefined();
  });

  it('should follow the proper lifetime hooks', async () => {
    await service.onModuleInit();
    await expect(service.onModuleInit).toReturn();
    await service.onModuleDestroy();
    await expect(service.onModuleDestroy).toReturn();
  });

  it('should define the properties expected for Prisma to function', () => {
    expect(service.$connect).toBeDefined();
    expect(service.$disconnect).toBeDefined();
    expect(service.$executeRaw).toBeDefined();
    expect(service.$on).toBeDefined();
    expect(service.$queryRaw).toBeDefined();
    expect(service.$transaction).toBeDefined();
    expect(service.$use).toBeDefined();

    expect(service.address).toBeDefined();
    expect(service.author).toBeDefined();
    expect(service.book).toBeDefined();
    expect(service.creditCard).toBeDefined();
    expect(service.genre).toBeDefined();
    expect(service.publisher).toBeDefined();
    expect(service.review).toBeDefined();
    expect(service.shoppingCart).toBeDefined();
    expect(service.transaction).toBeDefined();
    expect(service.user).toBeDefined();
  })
});
