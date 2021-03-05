import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    PrismaService,
    UtilityService,
    CaslAbilityFactory
  ]
})
export class BooksModule {}
