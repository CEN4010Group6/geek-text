import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Address as AddressModel, Prisma } from '@prisma/client';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

import { BaseDTO } from '../../dto/base';

export class Address extends BaseDTO implements AddressModel {

  @IsUUID()
  public id: string;

  @IsString()
  public street: string;

  @IsString()
  public apartmentOrUnit: string | null;

  @IsString()
  public city: string;

  @IsString()
  public state: string;

  @IsString()
  public country: string;

  @IsString()
  public zipcode: string;

  @IsBoolean()
  public isPreferredAddress: boolean;

  @IsOptional()
  @IsUUID()
  public userShippingAddressId: string;

  @IsOptional()
  public userShippingAddress?: Prisma.UserCreateNestedOneWithoutShippingAddressesInput

  constructor(merge: any) {
    super(merge);
  }
}

export class CreateAddress extends OmitType(Address, [
  'id',
  'userShippingAddress'
] as const) implements Prisma.AddressCreateWithoutUserShippingAddressInput {}

export class UpdateAddress extends PartialType(Address) implements Prisma.AddressUpdateInput {}
