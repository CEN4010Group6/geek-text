import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';

@Module({
  controllers: [ AuthorsController ],
  providers: [
    AuthorsService,
    PrismaService,
    UtilityService
  ]
})
export class AuthorsModule {}
