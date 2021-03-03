import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Book as BookModel, Prisma } from '@prisma/client';
import { IsCurrency, IsDataURI, IsDate, IsDecimal, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, IsUUID } from 'class-validator';

import { BaseDTO } from '../../dto/base';

export class Book extends BaseDTO implements BookModel {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  isbn: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDecimal()
  @IsCurrency()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  publishYear: number;

  @IsOptional()
  @IsUrl()
  coverUrl: string | null;

  @IsOptional()
  @IsDataURI()
  coverDataUri: string | null;

  @IsInt()
  @IsPositive()
  sold: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  averageRating?: number | null;

  @IsOptional()
  @IsUUID()
  transactionId: string | null;

  @IsOptional()
  @IsUUID()
  shoppingCartId: string | null;

  @IsUUID()
  publisherId: string;

  @IsOptional()
  @IsDefined()
  reviews?: Prisma.ReviewCreateOrConnectWithoutBookInput

  @IsOptional()
  @IsDefined()
  /**@TODO: Change to Connect publisher input */
  publisher?: Prisma.PublisherCreateOrConnectWithoutBookInput

  constructor(merge: BookModel | null) {
    super(merge);
  }
}

export class CreateBook extends OmitType(Book, [
  'createdAt',
  'updatedAt',
  'shoppingCartId',
  'reviews',
  'publisher',
  'transactionId',
  'averageRating'
] as const) implements Prisma.BookCreateWithoutPublisherInput {}

export class UpdateBook extends PartialType(Book) implements Prisma.BookUpdateInput {}
