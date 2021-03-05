import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';

@Module({
  controllers: [ AuthorsController ],
  providers: [
    AuthorsService,
    PrismaService,
    UtilityService,
    CaslAbilityFactory
  ]
})
export class AuthorsModule {}
