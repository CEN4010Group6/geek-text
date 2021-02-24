import { Prisma } from '@prisma/client';
import { IsAlphanumeric, IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class BookWhereUniqueInput implements Prisma.BookWhereUniqueInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsAlphanumeric()
  title?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  isbn?: number;
}
