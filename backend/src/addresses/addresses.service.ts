import { Injectable } from '@nestjs/common';
import { CreditCard as CreditCardModel, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { Address, CreateAddress } from './dto/address';

@Injectable()
export class AddressesService {
    /**
   * CreditCard service constructor
   * @param $prisma The Prisma database service
   */
  constructor(
    private readonly $prisma: PrismaService,
  ) {}

  /**
   * Create a new CreditCard in the `credit_cards` table
   *
   * @param data The CreditCard data to be created
   */
  public async create(
    data: CreateAddress
  ): Promise<Address> {
    return this.$prisma.address.create({ data });
  }

  /**
   * Removes a CreditCard from the `credit_cards` table
   *
   * @param where The unique identifier(s) of the CreditCard to be removed
   * @returns The CreditCard that was removed
   */
  public async delete(where: Prisma.AddressWhereUniqueInput): Promise<Address> {
    return this.$prisma.address.delete({ where });
  }
}
