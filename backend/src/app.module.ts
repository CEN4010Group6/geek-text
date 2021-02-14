import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { CacheService } from './cache/cache.service';
import { RatingsModule } from './ratings/ratings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BooksModule,
    AuthModule,
    RatingsModule,
    UsersModule
  ],
  controllers: [ AppController ],
  providers: [
    PrismaService,
    CacheService
  ],
})
export class AppModule {}
