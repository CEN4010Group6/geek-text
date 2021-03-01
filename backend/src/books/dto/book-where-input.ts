import { Prisma } from '@prisma/client';
import { IsAlphanumeric, IsCurrency, IsDataURI, IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive, IsUrl, IsUUID } from 'class-validator';
import { BaseDTO } from '../../dto/base';

export class BookWhereInput implements Prisma.BookWhereInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsAlphanumeric()
  title?: string;

  @IsOptional()
  authors?: Prisma.AuthorListRelationFilter;

  @IsOptional()
  publisher?: Prisma.PublisherRelationFilter;

  @IsOptional()
  @IsInt()
  @IsPositive()
  publishYear?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  isbn?: number;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  genres?: Prisma.GenreListRelationFilter;

  @IsOptional()
  @IsDecimal()
  @IsCurrency()
  @IsPositive()
  price?: number;

  @IsOptional()
  reviews?: Prisma.ReviewListRelationFilter;

  @IsOptional()
  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @IsOptional()
  @IsOptional()
  @IsDataURI()
  coverDataUri?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  sold?: number;

  @IsOptional()
  @IsOptional()
  @IsDate()
  createdAt?: Date | string;

  @IsOptional()
  @IsOptional()
  @IsDate()
  updatedAt?: Date | string;
}
