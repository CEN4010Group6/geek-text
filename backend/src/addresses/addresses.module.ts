import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';
import { PrismaService } from '../prisma/prisma.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  controllers: [
    AddressesController
  ],
  providers: [
    PrismaService,
    CaslAbilityFactory,
    AddressesService
  ]
})
export class AddressesModule {}
