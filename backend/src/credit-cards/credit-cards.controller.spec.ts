import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';
import { EncryptionService } from '../encryption/encryption.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreditCardsController } from './credit-cards.controller';
import { CreditCardsService } from './credit-cards.service';

describe('CreditCardsController', () => {
  let controller: CreditCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        CreditCardsController
      ],
      providers: [
        CreditCardsService,
        PrismaService,
        CaslAbilityFactory,
        EncryptionService,
        ConfigService
      ]
    }).compile();

    controller = module.get<CreditCardsController>(CreditCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
