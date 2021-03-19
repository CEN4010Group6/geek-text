import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Prisma, ShoppingCart as ShoppingCartModel } from '@prisma/client';
import { IsDate, IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '../../dto/base';

export class ShoppingCart extends BaseDTO implements ShoppingCartModel {
  @IsUUID()
  public id: string

  @IsOptional()
  @IsString()
  public userId: string;

  @IsOptional()
  @IsDefined()
  public books?: Prisma.BookCreateNestedManyWithoutShoppingCartInput;

  @IsDate()
  public createdAt: Date;

  @IsDate()
  public updatedAt: Date;

  @IsOptional()
  public user?: Prisma.UserCreateOrConnectWithoutShoppingCartInput;

  constructor(merge: ShoppingCartModel) {
    super(merge);
  }
}

export class CreateShoppingCart extends OmitType(ShoppingCart, [
  'id',
  'userId',
  'books',
  'createdAt',
  'updatedAt',
  'user'
] as const) implements Prisma.ShoppingCartCreateWithoutUserInput { }

export class UpdateShoppingCart extends PartialType(ShoppingCart) implements Prisma.ShoppingCartUpdateInput { }
