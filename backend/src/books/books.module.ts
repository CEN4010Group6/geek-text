import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    PrismaService,
    UtilityService
  ]
})
export class BooksModule {}
