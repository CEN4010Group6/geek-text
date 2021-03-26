import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from '../encryption/encryption.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreditCardsService } from './credit-cards.service';

describe('CreditCardsService', () => {
  let service: CreditCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CreditCardsService,
        EncryptionService,
        ConfigService
      ],
    }).compile();

    service = module.get<CreditCardsService>(CreditCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
