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

    if(user && argon2.verify(user.passwordHash, password)) {
      delete user.passwordHash;
      return user;
    }

    return null;
  }

  public async login(email: string, password: string): Promise<any> {
    const user = await this.$usersService.findOne({ email: email });

    if(user && argon2.verify(user.passwordHash, password)) {
      const payload = { username: user.email, sub: user.id };
      return {
        accessToken: this.$jwtService.sign(payload)
      }
    }

    return null;
  }
}
