import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BooksModule,
    AuthModule
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
