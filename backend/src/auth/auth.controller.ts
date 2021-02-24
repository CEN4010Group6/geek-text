import { Body, Controller, Delete, Get, Header, Param, Post, Put, Request, Query, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

import { LocalAuth } from './dto/local-auth';
import { Public } from '../public.decorator';

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
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
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
