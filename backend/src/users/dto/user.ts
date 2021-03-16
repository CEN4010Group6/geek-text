import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User as UserModel, Prisma } from '@prisma/client';
import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

import { BaseDTO } from '../../dto/base';

export class User extends BaseDTO implements UserModel {
  @IsUUID()
  public id: string;

  @IsString()
  public firstName: string;

  @IsOptional()
  @IsString()
  public middleName: string;

  @IsString()
  public lastName: string;

  @IsOptional()
  @IsString()
  public nickName: string;

  @IsOptional()
  @IsString()
  public profilePicture: string;

  @IsEmail()
  email: string;

  passwordHash: string;

  @IsOptional()
  roles?: Prisma.RoleUpdateManyWithoutUsersInput

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(merge: UserModel | null) {
    super(merge);
  }
}

export class CreateUser extends OmitType(User, [
  'id',
  'roles',
  'createdAt',
  'updatedAt',
] as const) implements Prisma.UserCreateInput {}

export class UpdateUser extends PartialType(User) implements Prisma.BookUpdateInput {}
