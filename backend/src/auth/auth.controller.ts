import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';

import { Public } from '../public.decorator';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalAuth } from './dto/local-auth';

@Controller('auth')
export class AuthController {
  /**
   * Auth controller constructor
   *
   * @param $authService The Authentication service
   */
  constructor(
    private readonly $authService: AuthService
  ) {}

  /**
   * Logs a user in to the application using BasicAuth
   *
   * @param email The user's email
   * @param password The user's password
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(200)
  public async login(
    @Request() req
  ): Promise<any> {
    return this.$authService.login(req.user);
  }

  /**
   * @TODO
   * Refreshes an expired but valid JWT if the expiration occurs within a set time period.
   */
  @Post('refresh-token')
  @Public()
  public async refreshToken(): Promise<any> {

  }
}
