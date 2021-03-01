import { Prisma } from '@prisma/client';
import { IsAlphanumeric, IsInt, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '../../dto/base';

export class BookWhereUniqueInput extends BaseDTO implements Prisma.BookWhereUniqueInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  isbn?: number;
}
