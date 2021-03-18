import { Prisma, ShoppingCart as ShoppingCartModel } from '@prisma/client';
import { IsDate, IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';

export class ShoppingCart implements ShoppingCartModel {
  @IsUUID()
  public id: string

  @IsString()
  userId: string;

  @IsOptional()
  @IsDefined()
  books?: Prisma.BookCreateNestedManyWithoutShoppingCartInput;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsOptional()
  user: Prisma.UserCreateOrConnectWithoutShoppingCartInput;
}
