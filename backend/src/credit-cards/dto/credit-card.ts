import { CreditCard as CreditCardModel } from '@prisma/client';

import { BaseDTO } from '../../dto/base';

export class CreditCard extends BaseDTO implements CreditCardModel {
  id: string;
  userId: string;
  nickName: string | null;
  encryptedCreditCardNumber: string;
  encryptedCCV: string;
  lastFourDigits: number;
  expirationDate: Date;
  isPreferredCreditCard: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(merge: any) {
    super(merge);
  }
}
