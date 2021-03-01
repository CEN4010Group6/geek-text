import { Prisma } from '@prisma/client';
import { IsAlphanumeric, IsCurrency, IsDataURI, IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, IsUUID } from 'class-validator';
import { BaseDTO } from '../../dto/base';

export class BookCreateInput extends BaseDTO implements Prisma.BookCreateInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  title: string;

  @IsInt()
  @IsPositive()
  publishYear: number;

  @IsInt()
  @IsPositive()
  isbn: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDecimal()
  @IsCurrency()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @IsOptional()
  @IsDataURI()
  coverDataUri?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  sold?: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date | string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | string;

  @IsOptional()
  authors?: Prisma.AuthorCreateNestedManyWithoutBooksInput

  @IsOptional()
  publisher: Prisma.PublisherCreateNestedOneWithoutBookInput

  @IsOptional()
  genres?: Prisma.GenreCreateNestedManyWithoutBooksInput

  @IsOptional()
  reviews?: Prisma.ReviewCreateNestedManyWithoutBookInput

  @IsOptional()
  Transaction?: Prisma.TransactionCreateNestedOneWithoutBooksInput

  @IsOptional()
  ShoppingCart?: Prisma.ShoppingCartCreateNestedOneWithoutBooksInput
}
