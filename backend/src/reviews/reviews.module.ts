import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ ReviewsController ],
  providers: [ PrismaService, ReviewsService ]
})
export class ReviewsModule {}
