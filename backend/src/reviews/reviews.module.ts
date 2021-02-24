import { UtilityService } from './../utility/utility.service';
import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ ReviewsController ],
  providers: [ PrismaService, ReviewsService, UtilityService ]
})
export class ReviewsModule {}
