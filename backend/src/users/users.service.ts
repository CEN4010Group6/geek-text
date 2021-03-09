import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './dto/user'

@Injectable()
export class UsersService {
    /**
   * Users service constructor
   *
   * @param $prisma The Prisma database service
   */
  constructor(
    private $prisma: PrismaService
  ) {}

  /**
   * Find a single User in the `users` table
   *
   * @param userWhereInput Input which specifies the book to be found
   */
  public async findOne(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<any | null> {
    const { where, select } = params;

    let user = await this.$prisma.user.findFirst({ where, select }) as User;

    if(user) {
      // @ts-ignore
      delete user.passwordHash;
    }

    return user;
  }

  /**
   * Finds all User records which match the given parameters
   *
   * @param params Parameters to match against the `users` table entries
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
    select?: Prisma.UserSelect;
  }): Promise<User[]> {
    let { skip, take, cursor, where, orderBy, select } = params;

    const users = await this.$prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select
    });

    for(let user of users) {
      // @ts-ignore
      delete user.passwordHash;
    }

    return users as User[];
  }

  /**
   * Create a new User in the `users` table
   *
   * @param data The User data to be created
   */
  public async create(data: {
    email: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    nickName: string;
  }): Promise<User> {
    let passwordHash = await argon2.hash(data.password);

    const newUser = {
      email: data.email,
      passwordHash: passwordHash,
      firstName: data.firstName,
      middleName: data.middleName || '',
      lastName: data.lastName,
      nickName: data.nickName
    };

    let user = await this.$prisma.user.create({ data:
      {
        ...newUser,
        roles: {
          connect: {
            name: 'user'
          }
        }
      }
    }) as User;

    if(user) {
      // @ts-ignore
      delete user.passwordHash;
    }

    return user;
  }

  /**
   * Updates a User in the `users` table
   *
   * @param params Updated User data
   */
  public async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (data.passwordHash) {
      data.passwordHash = await argon2.hash(data.passwordHash as string);
    }

    let user = await this.$prisma.user.update({
      data,
      where
    }) as User;

    if(user) {
      // @ts-ignore
      delete user.passwordHash;
    }

    return user;
  }

  /**
   * Removes a User entry from the `users` table
   *
   * @param where The unique identifier(s) of the User to be removed
   */
  public async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    let user = await this.$prisma.user.delete({
      where
    }) as User;

    if(user) {
      // @ts-ignore
      delete user.passwordHash;
    }

    return user;
  }
}
