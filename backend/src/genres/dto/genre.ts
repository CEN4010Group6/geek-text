import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Genre as GenreModel, Prisma } from '@prisma/client';
import { IsDate, IsInt, IsPositive, IsString } from 'class-validator';

import { BaseDTO } from '../../dto/base';

export class Genre extends BaseDTO implements GenreModel {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(merge: GenreModel | null) {
    super(merge);
  }
}

export class CreateGenre extends OmitType(Genre, [
  'id',
  'createdAt',
  'updatedAt'
] as const) implements Prisma.GenreCreateInput {}

export class UpdateGenre extends PartialType(Genre) implements Prisma.GenreUpdateInput {}
