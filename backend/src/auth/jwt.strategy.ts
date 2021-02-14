import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * JwtStrategey constructor
   *
   * @param $authService The Authentiacation service
   */
  constructor(private $authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.JWT_SECRET,
      issuer: 'geek-text',
      audience: 'geek-text',
    });
  }

  public async validate(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.email }

  }
}
