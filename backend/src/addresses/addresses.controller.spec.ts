import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';
import { PrismaService } from '../prisma/prisma.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

describe('AddressesController', () => {
  let controller: AddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        AddressesController
      ],
      providers: [
        AddressesService,
        PrismaService,
        CaslAbilityFactory
      ],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
