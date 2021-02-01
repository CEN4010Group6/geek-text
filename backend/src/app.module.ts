import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
