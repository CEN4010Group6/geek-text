import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import argon2 from 'argon2';

import { UsersService } from '../users/users.service';

/**
 *
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Auth service constructor
   *
   * @param $prisma Prisma database service
   */
  constructor(
    private $usersService: UsersService,
    private $jwtService: JwtService
  ) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.$usersService.findOne({ email: email });

    const hash = argon2.hash(password);

    if(user && user.hashPassword === hash) {
      delete user.hashPassword;
      return user;
    }

    return null;
  }

  public async login(user: User): Promise<{
    access_token: string;
  }> {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.$jwtService.sign(payload)
    }
  }
}
