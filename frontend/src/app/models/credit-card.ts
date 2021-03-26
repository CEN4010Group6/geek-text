import { BaseModel } from './base';

export class CreditCard extends BaseModel {
  [key: string]: any;
  id: string = '';
  userId?: string;
  nickName?: string;
  lastFourDigits?: string;
  expirationDate?: Date;
  isPreferredCreditCard?: boolean

  constructor(merge: any) {
    super(merge);
  }
}
