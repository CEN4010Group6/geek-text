import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, CacheInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { EncryptionService } from './encryption/encryption.service';
import { UtilityService } from './utility/utility.service';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    CacheModule.register({
      store: redisStore,
      host: 'redis-cache',
      port: 6379,
      max: 50
    }),
    AuthModule,
    BooksModule,
    ReviewsModule,
    UsersModule,
    AuthorsModule,
    GenresModule
  ],
  controllers: [ AppController ],
  providers: [
    PrismaService,
    EncryptionService,
    UtilityService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
})
export class AppModule {}
