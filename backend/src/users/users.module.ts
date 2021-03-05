import { UtilityService } from './../utility/utility.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';

@Module({
  controllers: [ UsersController ],
  providers: [
    PrismaService,
    UsersService,
    UtilityService,
    CaslAbilityFactory
  ],
  exports: [ UsersService ]
})
export class UsersModule {}
