import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { UtilityService } from '../utility/utility.service';

describe('AuthorsController', () => {
  let controller: AuthorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        AuthorsService,
        UtilityService
      ],
      controllers: [ AuthorsController ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
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
});
