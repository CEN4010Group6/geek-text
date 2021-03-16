import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Review as ReviewModel, Prisma } from '@prisma/client';
import { IsAlpha, IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

import { BaseDTO } from '../../dto/base';

export class Review extends BaseDTO implements ReviewModel {
  @IsUUID()
  public id: string;

  @IsInt()
  @IsPositive()
  public value: number;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsAlpha()
  public postedAs: string;

  @IsDate()
  public createdAt: Date;

  @IsDate()
  public updatedAt: Date;

  @IsUUID()
  public userId: string;

  @IsUUID()
  public bookId: string;

  @IsOptional()
  public book?: Prisma.BookUpdateOneRequiredWithoutReviewsInput;

  @IsOptional()
  public user?: Prisma.UserUpdateOneRequiredWithoutReviewsInput

  constructor(merge: any) {
    super(merge);
  }
}

export class CreateReview extends OmitType(Review, [
  'createdAt',
  'updatedAt'
] as const) {}

export class UpdateReview extends PartialType(Review) {}
