import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BooksService } from './books.service';
import { UtilityService } from '../utility/utility.service';

describe('BooksController', () => {
  let controller: BooksController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        BooksService,
        UtilityService
      ],
      controllers: [ BooksController ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('should have a method findOne', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('should have a method create', () => {
    expect(controller.create).toBeDefined();
  });

  it('should have a method update', () => {
    expect(controller.update).toBeDefined();
  });

  it('should have a method delete', () => {
    expect(controller.delete).toBeDefined();
  });

  // it('should return an array when findAll is called', async () => {
  //   expect.assertions(1);
  //   await expect(controller.findAll({})).resolves.toEqual(expect.any(Object));
  // });
});
