import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ RatingsController ],
  providers: [ PrismaService, RatingsService ]
})
export class RatingsModule {}
