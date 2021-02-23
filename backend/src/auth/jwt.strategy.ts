import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * JwtStrategey constructor
   *
   * @param $authService The Authentiacation service
   */
  constructor(
    private readonly $configService: ConfigService,
    private readonly $authService: AuthService,
    private readonly $prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: this.$configService.get<string>('JWT_SECRET'),
      issuer: 'geek-text',
      audience: 'geek-text',
    });
  }

  /**
   * Validates the JWT token
   *
   * @param payload the token to validate
   */
  public async validate(payload: any): Promise<any> {
    const user = await this.$prismaService.user.findUnique({
      where: {
        id: payload.userId,
      }
    });
    return user;
  }
}
