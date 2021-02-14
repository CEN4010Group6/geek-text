import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { CacheService } from './cache/cache.service';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    BooksModule,
    AuthModule,
    RatingsModule
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    PrismaService,
    CacheService
  ],
})
export class AppModule {}
