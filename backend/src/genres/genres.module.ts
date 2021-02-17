import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

@Module({
  controllers: [ GenresController ],
  providers: [
    PrismaService,
    GenresService,
    UtilityService
  ]
})
export class GenresModule {}
