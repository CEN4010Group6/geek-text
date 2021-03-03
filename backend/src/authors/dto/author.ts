import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Author as AuthorModel, Prisma } from '@prisma/client';
import { IsAlphanumeric, IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

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

  constructor(merge: any) {
    super(merge);
  }
}

export class CreateAuthor extends OmitType(Author, ['createdAt', 'updatedAt'] as const) {}

export class UpdateAuthor extends PartialType(Author) {}
