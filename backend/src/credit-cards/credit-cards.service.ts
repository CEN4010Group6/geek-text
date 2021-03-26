import { Injectable, NotFoundException } from '@nestjs/common';
import { CreditCard as CreditCardModel, Prisma } from '@prisma/client';
import { EncryptionService } from '../encryption/encryption.service';
import { PrismaService } from '../prisma/prisma.service';

import { CreditCard } from './dto/credit-card';


@Injectable()
export class CreditCardsService {
  /**
   * CreditCard service constructor
   * @param $prisma The Prisma database service
   */
  constructor(
    private readonly $prisma: PrismaService,
    private readonly $encryption: EncryptionService
  ) {}

  /**
   * Create a new CreditCard in the `credit_cards` table
   *
   * @param data The CreditCard data to be created
   */
  public async create(userId: string, data: {
    nickName: string;
    creditCardNumber: string;
    ccv: number;
    lastFourDigits: number;
    expirationDate: Date | string;
    isPreferredCreditCard: boolean;
  }): Promise<CreditCard> {
    const encryptedCreditCardNumber = await this.$encryption.encrypt(data.creditCardNumber);
    const encryptedCCV = await this.$encryption.encrypt(data.ccv.toString());

    const input = {
      user: {
        connect: {
          id: userId
        }
      },
      nickName: data.nickName,
      encryptedCreditCardNumber: encryptedCreditCardNumber,
      encryptedCCV: encryptedCCV,
      lastFourDigits: data.lastFourDigits,
      expirationDate: data.expirationDate,
      isPreferredCreditCard: data.isPreferredCreditCard
    };

    return this.$prisma.creditCard.create({ data: input });
  }

  /**
   * Removes a CreditCard from the `credit_cards` table
   *
   * @param where The unique identifier(s) of the CreditCard to be removed
   * @returns The CreditCard that was removed
   */
  public async delete(where: Prisma.CreditCardWhereUniqueInput): Promise<CreditCard> {
    return this.$prisma.creditCard.delete({ where });
  }
}
