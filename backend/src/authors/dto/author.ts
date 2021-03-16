import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Author as AuthorModel, Prisma } from '@prisma/client';
import { IsAlphanumeric, IsArray, IsDate, IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';

import { BaseDTO } from '../../dto/base';

export class Author extends BaseDTO implements AuthorModel {
  @IsUUID()
  public id: string;

  @IsAlphanumeric()
  public firstName: string;

  @IsAlphanumeric()
  public lastName: string;

  @IsAlphanumeric()
  public middleName: string | null;

  @IsString()
  public description: string;

  @IsDate()
  public createdAt: Date;

  @IsDate()
  public updatedAt: Date;

  @IsOptional()
  @IsUUID()
  public booksId?: string[]

  @IsOptional()
  @IsDefined()
  @IsArray()
  public books?: Prisma.BookCreateNestedManyWithoutAuthorsInput

  constructor(merge: any) {
    super(merge);
  }
}

export class CreateAuthor extends OmitType(Author, ['id', 'createdAt', 'updatedAt'] as const) implements Prisma.AuthorCreateInput {}

export class UpdateAuthor extends PartialType(Author) implements Prisma.AuthorUpdateInput {}
