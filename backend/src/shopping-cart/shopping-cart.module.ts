import { UtilityService } from './../utility/utility.service'; // TODO Ask Joseph what this does
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  controllers: [ShoppingCartController],
  providers: [PrismaService, ShoppingCartService, UtilityService],
})
export class ShoppingCartModule {}
