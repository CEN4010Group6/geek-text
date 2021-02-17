import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

describe('GenresController', () => {
  let controller: GenresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        GenresService,
        UtilityService
      ],
      controllers: [ GenresController ],
    }).compile();

    controller = module.get<GenresController>(GenresController);
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
