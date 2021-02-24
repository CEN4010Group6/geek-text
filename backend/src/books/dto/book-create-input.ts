import { Prisma } from '@prisma/client';
import { IsAlphanumeric, IsCurrency, IsDataURI, IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive, IsUrl, IsUUID } from 'class-validator';

export class BookCreateInput implements Prisma.BookCreateInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsAlphanumeric()
  title: string;

  @IsInt()
  @IsPositive()
  publishYear: number;

  @IsInt()
  @IsPositive()
  isbn: number;

  @IsNotEmpty()
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
  SavedShoppingCart?: Prisma.SavedShoppingCartCreateNestedOneWithoutBooksInput
}
