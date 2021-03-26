import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';
import { EncryptionService } from '../encryption/encryption.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreditCardsController } from './credit-cards.controller';
import { CreditCardsService } from './credit-cards.service';

@Module({
  controllers: [
    CreditCardsController
  ],
  providers: [
    CreditCardsService,
    EncryptionService,
    PrismaService,
    CaslAbilityFactory
  ]
})
export class CreditCardsModule {}
