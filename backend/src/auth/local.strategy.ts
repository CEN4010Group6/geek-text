import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '@prisma/client';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * LocalStrategy constructor
   *
   * @param $authService
   */
  constructor(
    private readonly $authService: AuthService
  ) {
    super({
      usernameField: 'email'
    });
  }

  /**
   * Validates a local user against the database
   *
   * @param username
   * @param password
   */
  public async validate(
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.$authService.validateUser(email, password);

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
