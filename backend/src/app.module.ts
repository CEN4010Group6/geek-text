import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { CacheService } from './cache/cache.service';
import { RatingsModule } from './ratings/ratings.module';
import { UsersModule } from './users/users.module';
import { EncryptionService } from './encryption/encryption.service';
import { UtilityService } from './utility/utility.service';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    BooksModule,
    AuthModule,
    RatingsModule,
    UsersModule,
    AuthorsModule,
    GenresModule
  ],
  controllers: [ AppController ],
  providers: [
    PrismaService,
    CacheService,
    EncryptionService,
    UtilityService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
