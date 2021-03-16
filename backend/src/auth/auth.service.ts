import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

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
    private readonly $prisaService: PrismaService,
    private readonly $jwtService: JwtService
  ) {}

  /**
   * Validates a user against the database using BasicAuth
   *
   * @param email The user's email address
   * @param password The user's password
   */
  public async validateUser(
    email: string,
    password: string
  ): Promise<any | null> {
    const user = await this.$prisaService.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        roles: true
      }
    });

    if(user?.passwordHash){
      const isValid = await argon2.verify(user.passwordHash, password);
      if(isValid) {
        const { passwordHash, ...result } = user;
        return result;
      }
    }

    return null;
  }

  /**
   * Performs the login action for a user and
   * assigns them a valid JWT
   *
   * @param email The user's email address
   * @param password The user's password
   */
  public async login(user: any): Promise<any> {

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles
    };

    return {
      accessToken: this.$jwtService.sign(payload),
      userId: user.id
    };
  }
}
