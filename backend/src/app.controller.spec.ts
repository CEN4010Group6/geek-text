import { Test, TestingModule } from '@nestjs/testing';
import { AppController, BrowserError } from './app.controller';
import { PrismaService } from './prisma/prisma.service';

import * as pkg from '../package.json';

describe('AppController', () => {
  let module: TestingModule;
  let controller: AppController;
  let database: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ AppController] ,
      providers: [ PrismaService ],
    }).compile();

    controller = module.get<AppController>(AppController);
    database = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method `getRoot`', () => {
    expect(controller.getRoot).toBeDefined();
  });

  it('should return a valid root object for the `getRoot` method', async () => {
    const obj: any = await controller.getRoot();

    expect(obj).toBeDefined();
    expect(obj.apiVersion).toBe(pkg.version)
    expect(obj.authors).toStrictEqual([pkg.author, ...pkg.contributors]);
    expect(obj.license).toBe(pkg.license);
    expect(obj.homepage).toBe(pkg.homepage);
  })

  it('should have a method `logError`', () => {
    expect(controller.logError).toBeDefined();
  });

  it('should log an error', async () => {
    expect(controller.logError(new BrowserError())).resolves.toBeUndefined();
  })
});
