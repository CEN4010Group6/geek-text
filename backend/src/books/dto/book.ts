import { BaseDTO } from '../../dto/base';
import { Book as BookModel } from '@prisma/client';
import { IsCurrency, IsDataURI, IsDate, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, IsUUID } from 'class-validator';

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
  reviews?: any[]

  @IsOptional()
  publisher?: any;

  constructor(merge: BookModel | null) {
    super(merge);
  }
}
