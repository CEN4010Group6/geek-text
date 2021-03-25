import { BaseModel } from "./base";
import { Address } from './address';
import { CreditCard } from "./credit-card";

export class User extends BaseModel {
  [key: string]: any;
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nickName?: string;
  profilePicture?: string;
  shippingAddresses?: Address[];
  creditCards?: CreditCard[];

  constructor(merge: any) {
    super(merge);
  }
}
